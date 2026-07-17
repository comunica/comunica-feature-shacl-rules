import { toAlgebra12Builder } from '@traqula/algebra-sparql-1-2';
import { findAllVariables } from '@traqula/algebra-transformations-1-1';
import type { AlgebraIndir } from '@traqula/algebra-transformations-1-1';
import type { Algebra, ContextConfigs } from '@traqula/algebra-transformations-1-2';
import { createAlgebraContext } from '@traqula/algebra-transformations-1-2';
import { IndirBuilder } from '@traqula/core';
import type { ContextDefinition } from '@traqula/rules-sparql-1-2';
import { DataFactory } from 'rdf-data-factory';
import { ShaclParser } from './shaclParser.js';
import { addMissingPrefixes } from './shaclUtils.js';
import type { RuleOrDataBlockType, ShaclDataNode, ShaclDeclarationNode, ShaclRuleNode } from './shaclTypes.js';

const origTranslateGraphPattern = toAlgebra12Builder.getRule('translateGraphPattern');
const origTranslateBasicGraphPattern = toAlgebra12Builder.getRule('translateBasicGraphPattern');
const origTranslateQuad = toAlgebra12Builder.getRule('translateQuad');
const origTranslateBgp = toAlgebra12Builder.getRule('translateBgp');
const registerContextDefinitions = toAlgebra12Builder.getRule('registerContextDefinitions');

export const shaqlQuery: AlgebraIndir<'shaqlQuery', any, [RuleOrDataBlockType]> = {
  name: 'shaqlQuery',
  fun: ({ SUBRULE }) => (C, ast) => {
    const initialContextDefs = ast.initialPrologue.filter((p): p is ContextDefinition => p.type === 'contextDef');
    SUBRULE(registerContextDefinitions, initialContextDefs);

    return ast.elements.map((element) => {
      if (element.type === 'contextDef') {
        SUBRULE(registerContextDefinitions, [ <ContextDefinition> element ]);
        return element;
      }

      if (element.type === 'shaclData') {
        return SUBRULE(data, element);
      }

      if (element.type === 'shaclRule') {
        return SUBRULE(translateShaclRule, element);
      }

      return element;
    });
  },
};

export interface ShaclRule extends Omit<Algebra.Construct, 'type'> {
  type: 'shaclRule';
}

export const data: AlgebraIndir<'data', Algebra.Pattern[], [ShaclDataNode]> = {
  name: 'data',
  fun: ({ SUBRULE }) => (C, dataNode) => {
    const bgp = <Algebra.Bgp> SUBRULE(origTranslateBgp, dataNode.triples);
    return bgp.patterns;
  },
};

export const translateShaclRule: AlgebraIndir<'translateShaclRule', ShaclRule, [ShaclRuleNode]> = {
  name: 'translateShaclRule',
  fun: ({ SUBRULE }) => (C, ruleAst) => {
    const patternAlgebra = SUBRULE(origTranslateGraphPattern, ruleAst.body);
    const flattenedTriples: any[] = [];

    const headTriples = ruleAst.head.triples;
    if (headTriples && headTriples !== (null as any) && typeof headTriples[Symbol.iterator] === 'function') {
      SUBRULE(origTranslateBasicGraphPattern, headTriples, flattenedTriples);
    }
    const templatePatterns = flattenedTriples.map(triple => SUBRULE(origTranslateQuad, triple));

    return {
      type: 'shaclRule',
      input: patternAlgebra,
      template: templatePatterns,
    };
  },
};

export const shaclAlgebraBuilder = IndirBuilder
  .create(toAlgebra12Builder)
  .addRuleRedundant(findAllVariables)
  .addRule(shaqlQuery)
  .addRule(data)
  .addRule(translateShaclRule);

const algebraTranslatorEngine = shaclAlgebraBuilder.build();

function createShaclRule(bodyPatterns: any[], headPatterns: any[]): any {
  return {
    type: 'shaclRule',
    input: { type: 'bgp', patterns: bodyPatterns },
    template: headPatterns,
  };
}

/**
 * Expand TRANSITIVE, SYMMETRIC, and INVERSE declarations into equivalent
 * SHACL rules so the operation actor can execute them like regular rules.
 *
 * @param elements - Algebra elements (DATA arrays and shaclRule nodes).
 * @param df       - RDF data factory for creating terms.
 * @param prefixes - Prefix map from the AST prologue: prefix string → namespace IRI.
 */
export function expandDeclarations(elements: any[], df: any, prefixes: Record<string, string>): any[] {
  function resolveIri(term: any): string {
    if (term.value.includes('://')) return term.value;
    const ns = (term.prefix !== undefined && term.prefix !== null) ? prefixes[term.prefix] || '' : '';
    return ns + term.value;
  }

  const result: any[] = [];
  for (const el of elements) {
    if (el && el.type === 'shaclDeclaration') {
      const decl = el as ShaclDeclarationNode;
      const iri1 = df.namedNode(resolveIri(decl.args[0]));
      const dg = df.defaultGraph();
      const mkPat = (s: any, p: any, o: any) => ({
        type: 'pattern', subject: s, predicate: p, object: o, graph: dg,
      });

      const X = df.variable('X');
      const Y = df.variable('Y');
      const Z = df.variable('Z');

      switch (decl.declarationType) {
        case 'transitive':
          result.push(createShaclRule(
            [ mkPat(X, iri1, Y), mkPat(Y, iri1, Z) ],
            [ mkPat(X, iri1, Z) ],
          ));
          break;
        case 'symmetric':
          result.push(createShaclRule(
            [ mkPat(Y, iri1, X) ],
            [ mkPat(X, iri1, Y) ],
          ));
          break;
        case 'inverse': {
          const iri2 = df.namedNode(resolveIri(decl.args[1]));
          result.push(createShaclRule(
            [ mkPat(Y, iri1, X) ],
            [ mkPat(X, iri2, Y) ],
          ));
          result.push(createShaclRule(
            [ mkPat(Y, iri2, X) ],
            [ mkPat(X, iri1, Y) ],
          ));
          break;
        }
      }
    } else {
      result.push(el);
    }
  }
  return result;
}

/**
 * Callback that resolves an IMPORT IRI to its source text.
 * Returns null if the import cannot be resolved.
 */
export type ImportResolver = (iri: string, baseIRI: string) => { source: string; baseIRI?: string } | null;

function extractPrefixes(ast: RuleOrDataBlockType): Record<string, string> {
  const prefixes: Record<string, string> = {};
  for (const p of (ast.initialPrologue as any[])) {
    if (p.type === 'contextDef' && p.subType === 'prefix') {
      prefixes[p.key ?? ''] = p.value?.value || '';
    }
  }
  return prefixes;
}

function getImportIRIs(ast: RuleOrDataBlockType): string[] {
  return (ast.initialPrologue as any[])
    .filter(p => p.type === 'contextDef' && p.subType === 'import')
    .map(p => p.import?.value)
    .filter(Boolean);
}

/**
 * Recursively resolve IMPORTS declarations by parsing each imported file
 * through the SHACL parser and merging their elements.
 */
export function resolveImports(
  ast: RuleOrDataBlockType,
  elements: any[],
  resolver?: ImportResolver,
  visited?: Set<string>,
): any[] {
  if (!resolver) return elements;

  const result = [...elements];
  const seen = visited || new Set<string>();
  const baseIRI = (ast.initialPrologue as any[]).find((p: any) => p.subType === 'base')?.value?.value || '';

  for (const importIRI of getImportIRIs(ast)) {
    if (seen.has(importIRI)) continue;
    seen.add(importIRI);

    const resolved = resolver(importIRI, baseIRI);
    if (!resolved) continue;

    const prefixed = addMissingPrefixes(resolved.source);
    const parser = new ShaclParser();
    const { AstFactory, completeParseContext } = require('@traqula/rules-sparql-1-2');
    const parseCtx = completeParseContext({
      astFactory: new AstFactory(),
      baseIRI: resolved.baseIRI || baseIRI,
      prefixes: {},
    });
    const importedAst = parser.parse(prefixed, parseCtx);

    const importedElements = algebraTranslatorEngine.shaqlQuery(
      createAlgebraContext({ baseIRI: resolved.baseIRI || baseIRI }),
      importedAst,
    );

    const nested = resolveImports(importedAst, importedElements, resolver, seen);
    for (const el of nested) result.push(el);
  }

  return result;
}

export function toShaclAlgebra(ast: RuleOrDataBlockType, config: ContextConfigs = {}): any {
  const algebraContext = createAlgebraContext(config);
  const elements = algebraTranslatorEngine.shaqlQuery(algebraContext, ast);

  const resolved = resolveImports(ast, elements, (config as any).importResolver);

  const df = config.dataFactory || new DataFactory();
  return expandDeclarations(resolved, df, extractPrefixes(ast));
}

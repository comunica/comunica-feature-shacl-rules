import type { IActorQueryParseArgs, IActionQueryParse, IActorQueryParseOutput } from '@comunica/bus-query-parse';
import { ActorQueryParse } from '@comunica/bus-query-parse';
import { KeysInitQuery } from '@comunica/context-entries';
import type { IActorTest, TestResult } from '@comunica/core';
import { failTest, passTestVoid } from '@comunica/core';
import type { ComunicaDataFactory } from '@comunica/types';
import type { Algebra } from '@comunica/utils-algebra';
import { ShaclParser, toShaclAlgebra, addMissingPrefixes, extractBaseIRI } from '@comunica/shacl-rule-1-2-parser';
import type * as RDF from '@rdfjs/types';
import { AstFactory, completeParseContext } from '@traqula/rules-sparql-1-2';
import { readFileSync } from 'fs';
import { resolve as resolvePath, dirname } from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

export class ActorQueryParseShaclRule extends ActorQueryParse<undefined> {
  private readonly shaclParser = new ShaclParser();

  public constructor(args: IActorQueryParseArgs) {
    super(args);
  }

  public async test(action: IActionQueryParse): Promise<TestResult<IActorTest>> {
    if (action.queryFormat && action.queryFormat.language !== 'shacl') {
      return failTest(`This actor can only parse shacl queries`);
    }
    return passTestVoid();
  }

  public async run(action: IActionQueryParse): Promise<IActorQueryParseOutput> {
    const dataFactory: ComunicaDataFactory = action.context.getSafe(KeysInitQuery.dataFactory);

    const queryWithPrefixes = addMissingPrefixes(action.query);

    const parseContext = completeParseContext({
      astFactory: new AstFactory(),
      baseIRI: action.baseIRI || '',
      prefixes: {},
    });
    const ast = this.shaclParser.parse(queryWithPrefixes, parseContext);

    const resolvedBaseIRI = extractBaseIRI(ast) || action.baseIRI || '';

    const importResolver = createImportResolver(action.baseIRI || process.cwd());

    const elements = toShaclAlgebra(ast, {
      dataFactory,
      baseIRI: resolvedBaseIRI,
      importResolver,
    } as any);

    const data: RDF.Quad[] = [];
    const rules: any[] = [];

    for (const el of elements) {
      if (Array.isArray(el)) {
        for (const pattern of el) {
          data.push(dataFactory.quad(
            pattern.subject,
            pattern.predicate,
            pattern.object,
            pattern.graph,
          ));
        }
      } else if (el && (el as any).type === 'shaclRule') {
        rules.push(el);
      }
    }

    if (rules.length === 0 && data.length === 0) {
      throw new Error('No SHACL rule or DATA found in input');
    }

    return {
      operation: <Algebra.Operation> <unknown> {
        type: 'shaclRule',
        data,
        rules,
      },
      ...(resolvedBaseIRI ? { baseIRI: resolvedBaseIRI } : {}),
    };
  }
}

function createImportResolver(documentBase: string) {
  const baseDir = typeof documentBase === 'string' && documentBase
    ? documentBase : pathToFileURL(process.cwd()).href;

  return (iri: string, _base: string): { source: string; baseIRI: string } | null => {
    try {
      const localBase = fileURLToPath(baseDir);
      const dir = baseDir.endsWith('/') ? localBase : dirname(localBase);
      const filePath = resolvePath(dir, iri);
      const source = readFileSync(filePath, 'utf8');
      return { source, baseIRI: pathToFileURL(filePath).href };
    } catch {
      return null;
    }
  };
}

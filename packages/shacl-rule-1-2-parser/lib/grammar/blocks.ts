import { sparql12ParserBuilder } from '@traqula/parser-sparql-1-2';
import * as T11 from '@traqula/rules-sparql-1-1';
import type * as T12 from '@traqula/rules-sparql-1-2';
import * as ST from '../shaclTokens.js';
import type {
  ShaclDataNode,
  ShaclDeclarationNode,
  ShaclHeadTemplate,
  ShaclRuleBlockResult,
  ShaclRuleNode,
  TriplesTemplateBlock,
} from '../shaclTypes.js';
import {
  bodyPattern,
} from './patterns.js';

const originalIri = sparql12ParserBuilder.getRule('iri');

export const shaclRuleBlock: T12.SparqlGrammarRule<'shaclRuleBlock', ShaclRuleBlockResult> = {
  name: 'shaclRuleBlock',
  impl: ({ SUBRULE, SUBRULE2, OR }) => () => OR<ShaclRuleBlockResult>([
    { ALT: () => SUBRULE(shaclRule1) },
    { ALT: () => SUBRULE(shaclRule2) },
    { ALT: () => SUBRULE2(shaclDeclarationBlock) },
  ]),
};

export const shaclRule1: T12.SparqlGrammarRule<'rule1', ShaclRuleNode> = {
  name: 'rule1',
  impl: ({ CONSUME, SUBRULE, ACTION }) => (C) => {
    const start = CONSUME(ST.RuleKeyword);
    const head = SUBRULE(triplesTemplateBlock);
    CONSUME(T11.lex.where);
    const body = SUBRULE(bodyPattern);

    return ACTION(() => ({
      type: 'shaclRule',
      token: start.image,
      head: head.triples,
      body: {
        type: 'pattern',
        subType: 'group',
        patterns: body.patterns,
        loc: body.loc,
      },
      loc: C.astFactory.sourceLocation(start, body),
    }));
  },
};

export const shaclRule2: T12.SparqlGrammarRule<'rule2', ShaclRuleNode> = {
  name: 'rule2',
  impl: ({ CONSUME, SUBRULE, ACTION }) => (C) => {
    const start = CONSUME(T11.lex.builtIn.if_);
    const body = SUBRULE(bodyPattern);
    CONSUME(ST.ThenKeyword);
    const head = SUBRULE(triplesTemplateBlock);

    return ACTION(() => ({
      type: 'shaclRule',
      token: start.image,
      head: head.triples,
      body: {
        type: 'pattern',
        subType: 'group',
        patterns: body.patterns,
        loc: body.loc,
      },
      loc: C.astFactory.sourceLocation(start, head),
    }));
  },
};

interface InternalDecl {
  token: any;
  args: T12.TermIri[];
}

export const shaclDeclarationBlock: T11.SparqlGrammarRule<'declaration', ShaclDeclarationNode> = {
  name: 'declaration',
  impl: ({ CONSUME, CONSUME2, CONSUME3, SUBRULE, SUBRULE2, SUBRULE3, SUBRULE4, OR, ACTION }) => (C) => {
    const result = OR<InternalDecl>([
      { ALT: () => {
        const t = CONSUME(ST.TransitiveKeyword);
        CONSUME(T11.lex.symbols.LParen);
        const arg = SUBRULE(originalIri);
        CONSUME(T11.lex.symbols.RParen);
        return { token: t, args: [ arg ]};
      } },
      { ALT: () => {
        const t = CONSUME(ST.SymmetricKeyword);
        CONSUME2(T11.lex.symbols.LParen);
        const arg = SUBRULE2(originalIri);
        CONSUME2(T11.lex.symbols.RParen);
        return { token: t, args: [ arg ]};
      } },
      { ALT: () => {
        const t = CONSUME(ST.InverseKeyword);
        CONSUME3(T11.lex.symbols.LParen);
        const arg1 = SUBRULE3(originalIri);
        CONSUME(T11.lex.symbols.comma);
        const arg2 = SUBRULE4(originalIri);
        CONSUME3(T11.lex.symbols.RParen);
        return { token: t, args: [ arg1, arg2 ]};
      } },
    ]);

    return ACTION(() => ({
      type: 'shaclDeclaration',
      declarationType: result.token.image.toLowerCase(),
      args: result.args,
      loc: C.astFactory.sourceLocation(result.token, result.token),
    }));
  },
};

export const shaclDataBlock: T11.SparqlGrammarRule<'shaclDataBlock', ShaclDataNode> = {
  name: 'shaclDataBlock',
  impl: ({ CONSUME, SUBRULE, ACTION }) => (C) => {
    const token = CONSUME(ST.DataKeyword);
    const triplesBlock = SUBRULE(triplesTemplateBlock);
    return ACTION(() => ({
      type: 'shaclData',
      token: token.image,
      triples: triplesBlock.triples,
      loc: C.astFactory.sourceLocation(token, triplesBlock),
    }));
  },
};

export const triplesTemplateBlock: T11.SparqlGrammarRule<'triplesTemplateBlock', TriplesTemplateBlock> = {
  name: 'triplesTemplateBlock',
  impl: ({ CONSUME, CONSUME2, SUBRULE, OPTION, ACTION }) => (C) => {
    const startToken = CONSUME(T11.lex.symbols.LCurly);
    let triples: T12.PatternBgp | null = null;
    OPTION(() => {
      triples = SUBRULE(originalTriplesTemplate);
    });
    const endToken = CONSUME2(T11.lex.symbols.RCurly);
    return ACTION(() => ({
      type: 'TriplesTemplateBlock',
      triples: triples || { type: 'bgp' as any, patterns: [] } as any,
      loc: C.astFactory.sourceLocation(startToken, endToken),
    }));
  },
};

export const shaclHeadTemplate: T11.SparqlGrammarRule<'shaclHeadTemplate', ShaclHeadTemplate> = {
  name: 'shaclHeadTemplate',
  impl: ({ SUBRULE, ACTION }) => (C) => {
    const triplesBlock = SUBRULE(triplesTemplateBlock);
    return ACTION(() => ({
      type: 'shaclHeadTemplate',
      triples: triplesBlock.triples,
      loc: C.astFactory.sourceLocation(triplesBlock),
    }));
  },
};

const originalTriplesTemplate = sparql12ParserBuilder.getRule(T11.gram.triplesTemplate.name);

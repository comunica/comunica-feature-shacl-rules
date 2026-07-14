import { sparql12ParserBuilder } from '@traqula/parser-sparql-1-2';
import * as T11 from '@traqula/rules-sparql-1-1';
import type * as T12 from '@traqula/rules-sparql-1-2';
import * as ST from '../shaclTokens.js';
import type {
  ShaclBodyNode,
} from '../shaclTypes.js';

const originalTriplesBlock = sparql12ParserBuilder.getRule('triplesBlock');
const originalFilter = sparql12ParserBuilder.getRule('filter');
const originalBind = sparql12ParserBuilder.getRule('bind');
const originalExpression = sparql12ParserBuilder.getRule('expression');
const originalVar = sparql12ParserBuilder.getRule('var');

export const shaclSet: T11.SparqlGrammarRule<'shaclSet', any> = {
  name: 'shaclSet',
  impl: ({ CONSUME, CONSUME2, SUBRULE, SUBRULE2, ACTION }) => (C: any) => {
    const startToken = CONSUME(ST.SetKeyword);
    CONSUME(T11.lex.symbols.LParen);
    const variable: any = SUBRULE(originalVar);
    CONSUME(ST.SetAssignToken);
    const expr: any = SUBRULE2(originalExpression);
    const endToken = CONSUME2(T11.lex.symbols.RParen);
    return ACTION(() => C.astFactory.patternBind(expr, variable, C.astFactory.sourceLocation(startToken, endToken)));
  },
};

export const bodyPattern: T12.SparqlGrammarRule<'bodyPattern', ShaclBodyNode> = {
  name: 'bodyPattern',
  impl: ({ CONSUME, SUBRULE, ACTION }) => (C) => {
    const start = CONSUME(T11.lex.symbols.LCurly);
    const patterns: T12.Pattern[] = SUBRULE(bodyPattern1);
    const end = CONSUME(T11.lex.symbols.RCurly);
    return ACTION(() => ({
      type: 'shaclBody',
      patterns,
      loc: C.astFactory.sourceLocation(start, end),
    }));
  },
};

export const bodyPattern1: T12.SparqlGrammarRule<'bodyPattern1', T12.Pattern[]> = {
  name: 'bodyPattern1',
  impl: ({ OPTION, OPTION2, OPTION3, MANY, SUBRULE, SUBRULE2, SUBRULE3, SUBRULE4, SUBRULE5, SUBRULE6, OR, ACTION, CONSUME }) => () => {
    const elements: T12.Pattern[] = [];

    OPTION(() => {
      const triples = SUBRULE(originalTriplesBlock);
      ACTION(() => elements.push(triples));
    });

    MANY(() => {
      const nonTriple = OR <T12.Pattern>([
        { ALT: () => SUBRULE2(originalFilter) },
        { ALT: () => SUBRULE3(negation) },
        { ALT: () => SUBRULE4(originalBind) },
        { ALT: () => SUBRULE5(shaclSet) },
      ]);
      ACTION(() => elements.push(nonTriple));

      OPTION2(() => {
        CONSUME(T11.lex.symbols.dot);
      });

      OPTION3(() => {
        const triples = SUBRULE6(originalTriplesBlock);
        ACTION(() => elements.push(triples));
      });
    });

    return ACTION(() => elements);
  },
};

export const negation: T12.SparqlGrammarRule<'negation', T12.PatternMinus> = {
  name: 'negation',
  impl: ({ CONSUME, SUBRULE, ACTION }) => (C) => {
    const startToken = CONSUME(ST.NotKeyword);
    CONSUME(T11.lex.symbols.LCurly);

    const innerPatterns = SUBRULE(bodyBasic);

    const endToken = CONSUME(T11.lex.symbols.RCurly);

    return ACTION(() => ({
      type: 'pattern',
      subType: 'minus',
      patterns: innerPatterns,
      loc: C.astFactory.sourceLocation(startToken, endToken),
    }));
  },
};

export const bodyBasic: T12.SparqlGrammarRule<'bodyBasic', T12.Pattern[]> = {
  name: 'bodyBasic',
  impl: ({ OPTION, OPTION2, MANY, SUBRULE, SUBRULE2, SUBRULE3, SUBRULE4, SUBRULE5, SUBRULE6, OR, ACTION }) => () => {
    const elements: T12.Pattern[] = [];

    OPTION(() => {
      const triples = SUBRULE(originalTriplesBlock);
      ACTION(() => elements.push(triples));
    });

    MANY(() => {
      const filterOrSet = OR([ 
        { ALT: () => SUBRULE2(originalFilter) },
        { ALT: () => SUBRULE3(shaclSet) },
      ]);
      ACTION(() => elements.push(filterOrSet));

      OPTION2(() => {
        const triples = SUBRULE5(originalTriplesBlock);
        ACTION(() => elements.push(triples));
      });
    });

    return ACTION(() => elements);
  },
};

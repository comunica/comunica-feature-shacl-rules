import * as T11 from '@traqula/rules-sparql-1-1';
import type * as T12 from '@traqula/rules-sparql-1-2';

export const shaclPath: T12.SparqlGrammarRule<'path', T12.Path> = {
  name: 'path',
  impl: ({ SUBRULE }) => () => SUBRULE(T11.gram.pathSequence),
};

export const shaclPathElt: T12.SparqlGrammarRule<'pathElt', T12.Path> = {
  name: 'pathElt',
  impl: ({ SUBRULE }) => () => SUBRULE(T11.gram.pathPrimary),
};

export const shaclPathPrimary: T12.SparqlGrammarRule<'pathPrimary', T12.Path> = {
  name: 'pathPrimary',
  impl: ({ SUBRULE, CONSUME, OR }) => () => OR([
    { ALT: () => SUBRULE(T11.gram.iri) },
    { ALT: () => SUBRULE(T11.gram.verbA) },
    { ALT: () => {
      CONSUME(T11.lex.symbols.LParen);
      const result = SUBRULE(T11.gram.path);
      CONSUME(T11.lex.symbols.RParen);
      return result;
    } },
  ]),
};

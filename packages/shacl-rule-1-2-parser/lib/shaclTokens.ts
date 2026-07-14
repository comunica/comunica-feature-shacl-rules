import { createToken, type NamedToken } from '@traqula/core';
import { lex as l } from '@traqula/rules-sparql-1-2';

export const ImportsKeyword = createToken({ name: 'ImportsKeyword', pattern: /imports/i });
export const RuleKeyword = createToken({ name: 'RuleKeyword', pattern: /rule/i });
export const DataKeyword = createToken({ name: 'DataKeyword', pattern: /data/i });

export const TransitiveKeyword = createToken({ name: 'TransitiveKeyword', pattern: /transitive/i });
export const SymmetricKeyword = createToken({ name: 'SymmetricKeyword', pattern: /symmetric/i });
export const InverseKeyword = createToken({ name: 'InverseKeyword', pattern: /inverse/i });

export const NotKeyword = createToken({ name: 'NotKeyword', pattern: /not/i });
export const ThenKeyword = createToken({ name: 'ThenKeyword', pattern: /then/i });
export const SetKeyword = createToken({ name: 'SetKeyword', pattern: /set/i });
export const SetAssignToken = createToken({ name: 'SetAssignToken', pattern: /:=/ });

export const shaclTokens: NamedToken[] = [
  SetAssignToken,
  ImportsKeyword,
  RuleKeyword,
  TransitiveKeyword,
  SymmetricKeyword,
  InverseKeyword,
  ...l.sparql12LexerBuilder.tokenVocabulary,
  DataKeyword,
  NotKeyword,
  ThenKeyword,
  SetKeyword,
];

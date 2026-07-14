import type { RuleOrDataBlockType } from './shaclTypes.js';

const KNOWN_PREFIXES: Record<string, string> = {
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  log: 'http://www.w3.org/2000/10/swap/log#',
  list: 'http://www.w3.org/2000/10/swap/list#',
  math: 'http://www.w3.org/2000/10/swap/math#',
  string: 'http://www.w3.org/2000/10/swap/string#',
  time: 'http://www.w3.org/2000/10/swap/time#',
  func: 'http://www.w3.org/2007/rif-builtin-function#',
};

/**
 * Prepend well-known PREFIX declarations to a SHACL query string if they are
 * not already declared.  Eye-style .srl files often use prefixes such as rdf:
 * without an explicit declaration.
 */
export function addMissingPrefixes(query: string): string {
  const existing = new Set<string>();
  for (const m of query.matchAll(/^PREFIX\s+(\S*?):/gm)) {
    existing.add(m[1]);
  }
  const missing = Object.entries(KNOWN_PREFIXES)
    .filter(([pref]) => pref && !existing.has(pref))
    .map(([pref, iri]) => `PREFIX ${pref}: <${iri}>\n`)
    .join('');
  return missing + query;
}

/**
 * Extract the BASE IRI from the initial prologue of a parsed SHACL Rules AST.
 * Returns an empty string if no BASE declaration is present.
 */
export function extractBaseIRI(ast: RuleOrDataBlockType): string {
  const baseDef = (ast.initialPrologue as any[]).find((p: any) => p.subType === 'base');
  return (baseDef as any)?.value?.value || '';
}

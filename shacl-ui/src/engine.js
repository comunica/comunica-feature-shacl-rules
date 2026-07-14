import { Parser } from 'n3';
import { RdfStore } from 'rdf-stores';

const { QueryEngine } = window.ComunicaShacl || {};

let _worker = null;
function getWorker() {
  if (!_worker) _worker = new Worker('worker.js');
  return _worker;
}

/**
 * Run SHACL query in a Web Worker — keeps UI responsive for large examples.
 */
export function runInWorker({ shaclQuery, turtleData }) {
  return new Promise((resolve, reject) => {
    const worker = getWorker();
    worker.onmessage = (e) => {
      if (e.data.type === 'result') resolve(e.data);
      else if (e.data.type === 'error') reject(new Error(e.data.error));
    };
    worker.onerror = (e) => reject(new Error(e.message));
    worker.postMessage({ shaclQuery, turtleData });
  });
}

function extractPrefixLines(shaclQuery) {
  return shaclQuery.split('\n').filter(line => /^\s*PREFIX\s+/i.test(line)).join('\n');
}

function parsePrefixMap(prefixLines) {
  const map = {};
  for (const line of prefixLines.split('\n')) {
    const m = line.match(/PREFIX\s+(\S*):\s*<([^>]+)>/i);
    if (m) map[m[1] || ''] = m[2];
  }
  return map;
}

let lastStore = null;
let lastShaclQuery = null;

export function parseRules(shaclQuery) { return []; }

export async function runShaclQuery({ shaclQuery, turtleData }, onQuad) {
  if (!QueryEngine) throw new Error('Engine bundle not loaded. Ensure engine-browser.js is loaded before app.bundle.js.');
  await new Promise(r => setTimeout(r, 0)); // yield to let DOM paint before heavy engine init
  const engine = new QueryEngine();
  const store = RdfStore.createDefault();
  if (turtleData && turtleData.trim()) {
    const pfx = extractPrefixLines(shaclQuery);
    const parser = new Parser();
    store.addQuads(parser.parse(pfx + '\n' + turtleData));
  }
  const stream = await engine.queryQuads(shaclQuery, {
    sources: [store],
    destination: store,
    queryFormat: { language: 'shacl', version: '1.2' },
  });
  return new Promise((resolve, reject) => {
    stream.on('data', q => onQuad({
      subject: q.subject.value, predicate: q.predicate.value,
      object: q.object.value, graph: q.graph.value || '',
    }));
    stream.on('error', reject);
    stream.on('end', () => { lastStore = store; lastShaclQuery = shaclQuery; resolve(); });
  });
}

function resolveToken(token, prefixes) {
  const sep = token.indexOf(':');
  if (sep === -1) { const base = prefixes[''] || ''; return base ? base + token : token; }
  const pfx = token.slice(0, sep); const loc = token.slice(sep + 1);
  return (prefixes[pfx] || '') + loc;
}

function matchHead(headText, triple, prefixes) {
  const triples = headText.split('.').map(t => t.trim()).filter(Boolean);
  for (const tpl of triples) {
    const parts = tpl.split(/\s+/).filter(Boolean);
    if (parts.length !== 3) continue;
    const [s, p, o] = parts.map(t => resolveToken(t, prefixes));
    if (p !== triple.predicate) continue;
    const bindings = {};
    if (!s.startsWith('?') && s !== triple.subject) continue;
    if (!o.startsWith('?') && o !== triple.object) continue;
    if (s.startsWith('?')) bindings[s.slice(1)] = triple.subject;
    if (o.startsWith('?')) bindings[o.slice(1)] = triple.object;
    return bindings;
  }
  return null;
}

export async function explainTriple(shaclQuery, triple) {
  if (!lastStore || !QueryEngine) return [];
  const rules = parseRules(shaclQuery);
  const prefixes = parsePrefixMap(extractPrefixLines(shaclQuery) || '');
  const results = [];
  for (const rule of rules) {
    const bindings = matchHead(rule.head, triple, prefixes);
    if (bindings) results.push({ ruleIndex: rule.index, ruleHead: rule.head, ruleBody: rule.body, bindings, bindingRows: [] });
  }
  return results;
}

if (typeof window !== 'undefined') {
  window.ShaclEngine = { runShaclQuery, runInWorker, explainTriple, parseRules };
}

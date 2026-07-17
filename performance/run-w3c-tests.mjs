/**
 * W3C SHACL Rules Test Suite Runner
 * Usage: node performance/run-w3c-tests.mjs [--filter name] [--verbose]
 */
import { createRequire } from 'module';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const N3 = require('n3');
const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore } = require('rdf-stores');

const testDir = join(__dirname, 'w3c-tests');
const verbose = process.argv.includes('--verbose');
const filterArg = process.argv.find(a => a.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const MF = 'http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#';
const SRT = 'http://www.w3.org/ns/shacl-rules-test#';
const BASE = 'https://w3c.github.io/rdf-tests/shacl/shacl12/';

function quadKey(q) { return `${q.subject.value}\x00${q.predicate.value}\x00${q.object.value}\x00${q.graph.value}`; }

function parseManifest(filepath) {
  if (!existsSync(filepath)) return [];
  const quads = new N3.Parser().parse(readFileSync(filepath, 'utf8'));
  const store = new N3.Store(quads);
  const subjects = new Set(quads.filter(q => q.predicate.value === `${RDF}type` && q.object.value.startsWith(SRT)).map(q => q.subject.value));
  const tests = [];
  for (const s of subjects) {
    const type = store.getObjects(s, `${RDF}type`, null)[0]?.value || '';
    const name = store.getObjects(s, `${MF}name`, null)[0]?.value || '';
    const actionNode = store.getObjects(s, `${MF}action`, null)[0];
    const actionFile = actionNode
      ? (actionNode.termType === 'BlankNode'
        ? store.getObjects(actionNode, `${SRT}ruleset`, null)[0]?.value || store.getObjects(actionNode, `${MF}action`, null)[0]?.value
        : actionNode.value)
      : '';
    const dataFile = actionNode && actionNode.termType === 'BlankNode'
      ? store.getObjects(actionNode, `${SRT}data`, null)[0]?.value || null : null;
    const resultFile = store.getObjects(s, `${MF}result`, null)[0]?.value || null;
    tests.push({ type, name, actionFile: actionFile.replace(BASE, ''), dataFile: dataFile?.replace(BASE, ''), resultFile: resultFile?.replace(BASE, '') });
  }
  return tests;
}

async function runEvalTest(dir, actionFile, dataFile, resultFile) {
  const src = readFileSync(join(dir, actionFile), 'utf8');
  const engine = new QueryEngine();
  const store = RdfStore.createDefault();
  if (dataFile && existsSync(join(dir, dataFile))) {
    for (const q of new N3.Parser().parse(readFileSync(join(dir, dataFile), 'utf8'))) store.addQuad(q);
  }
  const t0 = performance.now();
  const stream = await engine.queryQuads(src, { sources: [store], destination: store, queryFormat: { language: 'shacl', version: '1.2' } });
  const quads = [];
  await new Promise((r, j) => { stream.on('data', q => quads.push(q)); stream.on('error', j); stream.on('end', r); });
  const ms = Math.round(performance.now() - t0);
  const got = new Set(quads.map(quadKey));
  if (resultFile && existsSync(join(dir, resultFile))) {
    const ex = new N3.Parser().parse(readFileSync(join(dir, resultFile), 'utf8'));
    const exp = new Set(ex.map(quadKey));
    return { count: quads.length, expCount: ex.length, ms, match: exp.size === got.size && [...exp].every(k => got.has(k)), missing: [...exp].filter(k => !got.has(k)).length, extra: [...got].filter(k => !exp.has(k)).length };
  }
  return { count: quads.length, ms, match: true };
}

function runSyntaxTest(dir, actionFile, expectPass) {
  const src = readFileSync(join(dir, actionFile), 'utf8');
  const { ShaclParser } = require('@comunica/shacl-rule-1-2-parser');
  const { AstFactory, completeParseContext } = require('@traqula/rules-sparql-1-2');
  try {
    const parser = new ShaclParser();
    parser.parse(src, completeParseContext({ astFactory: new AstFactory(), prefixes: {} }));
    return { pass: expectPass, error: null };
  } catch (e) {
    return { pass: !expectPass, error: e.message };
  }
}

async function main() {
  const allTests = [];
  for (const cat of ['syntax', 'wellformed', 'stratification', 'eval']) {
    const dir = join(testDir, cat);
    const manifestFile = join(dir, 'manifest.ttl');
    if (!existsSync(manifestFile)) continue;
    const tests = parseManifest(manifestFile);
    for (const t of tests) allTests.push({ ...t, dir, cat });
  }

  if (filter) {
    const f = allTests.filter(t => t.name.includes(filter) || t.actionFile.includes(filter));
    if (f.length > 0) allTests.length = 0, allTests.push(...f);
  }

  console.log(`\n  Running ${allTests.length} W3C SHACL Rules tests\n`);
  let passed = 0, failed = 0, skipped = 0;

  for (const t of allTests) {
    const label = `${t.cat.padEnd(6)} ${t.actionFile.padEnd(45)}`;
    try {
      if (t.type === `${SRT}RulesEvalTest`) {
        const r = await runEvalTest(t.dir, t.actionFile, t.dataFile, t.resultFile);
        const status = r.match === true ? 'PASS' : (r.count === r.expCount ? '?' : 'FAIL');
        if (r.match) passed++; else failed++;
        process.stdout.write(`  ${label}${status.padEnd(8)}${String(r.count).padStart(6)} /${String(r.expCount||'?').padStart(6)}  ${r.ms}ms\n`);
      } else if (t.type.startsWith(`${SRT}RulesPositiveSyntaxTest`)) {
        const r = runSyntaxTest(t.dir, t.actionFile, true);
        if (r.pass) passed++; else failed++;
        process.stdout.write(`  ${label}${r.pass ? 'PASS' : 'FAIL'}  ${r.error ? r.error.slice(0,60) : ''}\n`);
      } else if (t.type.startsWith(`${SRT}RulesNegativeSyntaxTest`)) {
        const r = runSyntaxTest(t.dir, t.actionFile, false);
        if (r.pass) passed++; else failed++;
        process.stdout.write(`  ${label}${r.pass ? 'PASS' : 'FAIL'}  ${r.error ? r.error.slice(0,60) : ''}\n`);
      } else if (t.type.startsWith(`${SRT}RulesPositiveStratificationTest`) || t.type.startsWith(`${SRT}RulesPositiveWellFormednessTest`)) {
        const r = runSyntaxTest(t.dir, t.actionFile, true);
        if (r.pass) passed++; else failed++;
        process.stdout.write(`  ${label}${r.pass ? 'PASS' : 'FAIL'}  ${r.error ? r.error.slice(0,60) : ''}\n`);
      } else {
        process.stdout.write(`  ${label}SKIP (${t.type.replace(SRT,'')})\n`);
        skipped++;
      }
    } catch (e) {
      failed++;
      process.stdout.write(`  ${label}ERROR  ${e.message.slice(0,60)}\n`);
    }
  }
  console.log(`\n  ${'─'.repeat(90)}`);
  console.log(`  ${passed} passed, ${failed} failed, ${skipped} skipped (${allTests.length} total)\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main();

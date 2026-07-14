/**
 * Benchmark: deep taxonomy inference
 *
 * Runs each deep-taxonomy-*.srl file through:
 *   1. Comunica (actor-query-operation-shacl-rule, SCC-stratified)
 *   2. eyesharl  (reference implementation)
 *
 * Reports timing (ms), inferred triple count, and for Comunica the number
 * of CONSTRUCT mediator calls (proxy for rule-application cost).
 *
 * Usage:
 *   node benchmark.mjs
 *   node benchmark.mjs --sizes 1000,10000   // comma-separated depth list
 *   node benchmark.mjs --profile            // show per-phase timing breakdown
 *   node benchmark.mjs --sizes 10000 --profile
 *
 * Profile output shows time split across four phases:
 *   - Stratification : buildDependencyEdges + SCC + topological sort
 *                      (everything inside runOperation except rule loops)
 *   - Rule execution : one SPARQL CONSTRUCT per rule via applyRule()
 *   - Store insertion: quad writes back into RdfStore via insertQuads()
 *   - Stream drain   : reading the pre-built UnionIterator after queryQuads() returns
 *
 * Debug (step into actor in Chrome DevTools / VS Code):
 *   node --inspect-brk benchmark.mjs
 *   Then open chrome://inspect or attach VS Code "Node.js: Attach" launch config.
 *   Source maps are in actor-query-operation-shacl-rule/lib/*.js.map
 */

import { createRequire } from 'module';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore }    = require('rdf-stores');
let eyesharl;
try {
  eyesharl = require('eyeleng/src/api.js');
} catch {
  eyesharl = null;
}

// CLI flags
const profileMode = process.argv.includes('--profile');

const sizesArg = process.argv.find(a => a.startsWith('--sizes=') || a === '--sizes');
let requestedSizes = null;
if (sizesArg) {
  const val = sizesArg.includes('=')
    ? sizesArg.split('=')[1]
    : process.argv[process.argv.indexOf(sizesArg) + 1];
  requestedSizes = new Set(val.split(',').map(s => s.trim()));
}

const examplesDir = join(__dirname, 'public', 'examples');
const files = readdirSync(examplesDir)
  .filter(f => /^deep-taxonomy-\d+\.srl$/.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/(\d+)/)[1], 10);
    const nb = parseInt(b.match(/(\d+)/)[1], 10);
    return na - nb;
  });

const filteredFiles = files.filter(f => {
  if (!requestedSizes) return true;
  const depth = f.match(/(\d+)/)[1];
  return requestedSizes.has(depth);
});

if (filteredFiles.length === 0) {
  console.error('No matching files found in', examplesDir);
  process.exit(1);
}

// Per-run timing state, reset before each Comunica run.
const _phaseMs  = { applyRule: 0, insertQuads: 0 };
const _phaseCnt = { applyRule: 0, insertQuads: 0 };
let   _constructCallCount = 0;

function resetPhaseTimers() {
  _phaseMs.applyRule    = 0;
  _phaseMs.insertQuads  = 0;
  _phaseCnt.applyRule   = 0;
  _phaseCnt.insertQuads = 0;
  _constructCallCount   = 0;
}

/**
 * Patch the actor prototype once.
 *
 * Wraps applyRule() and insertQuads() to accumulate wall-clock time and call
 * counts into the shared _phaseMs / _phaseCnt objects.  A single patch covers
 * all QueryEngine instances created during the benchmark.
 */
function patchActor() {
  const actorMod = require('@comunica/actor-query-operation-shacl-rule');
  const proto    = actorMod.ActorQueryOperationShaclRule.prototype;
  if (proto.__benchPatched) return;

  const origApply = proto.applyRule;
  proto.applyRule = async function (...args) {
    _constructCallCount++;
    _phaseCnt.applyRule++;
    const t = performance.now();
    const result = await origApply.apply(this, args);
    _phaseMs.applyRule += performance.now() - t;
    return result;
  };

  const origInsert = proto.insertQuads;
  proto.insertQuads = async function (...args) {
    _phaseCnt.insertQuads++;
    const t = performance.now();
    const result = await origInsert.apply(this, args);
    _phaseMs.insertQuads += performance.now() - t;
    return result;
  };

  proto.__benchPatched = true;
}

async function runComunica(src) {
  const engine = new QueryEngine();
  const store  = RdfStore.createDefault();
  resetPhaseTimers();

  const t0 = performance.now();

  // queryQuads() awaits runOperation() which finishes ALL stratification and
  // rule execution before returning the stream.
  const stream      = await engine.queryQuads(src, {
    sources:     [store],
    destination: store,
    queryFormat: { language: 'shacl', version: '1.2' },
  });
  const tAfterSetup = performance.now();

  // Drain the pre-built UnionIterator.
  let count = 0;
  await new Promise((resolve, reject) => {
    stream.on('data',  () => count++);
    stream.on('error', reject);
    stream.on('end',   resolve);
  });
  const tEnd = performance.now();

  const totalMs = tEnd - t0;
  const setupMs = tAfterSetup - t0;       // stratification + rule execution
  const drainMs = tEnd - tAfterSetup;     // reading the UnionIterator

  // Stratification = everything in runOperation that is not applyRule / insertQuads.
  const stratMs = setupMs - _phaseMs.applyRule - _phaseMs.insertQuads;

  return {
    ms: totalMs,
    count,
    constructCalls: _constructCallCount,
    timing: {
      stratMs,
      applyRuleMs:  _phaseMs.applyRule,
      insertMs:     _phaseMs.insertQuads,
      drainMs,
      totalMs,
      calls: { applyRule: _phaseCnt.applyRule, insertQuads: _phaseCnt.insertQuads },
    },
  };
}

function runEyesharl(src) {
  if (!eyesharl) return { ms: NaN, count: 'N/A', iterations: '-' };
  const t0     = performance.now();
  const result = eyesharl.run(src);
  const ms     = performance.now() - t0;
  return { ms, count: result.inferred.length, iterations: result.iterations };
}

function col(s, width) { return String(s).padStart(width); }
function fmt(ms)       { return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`; }
function pct(part, total) { return total > 0 ? `${Math.round(100 * part / total)}%` : '-'; }
function fmtAvg(totalMs, calls) {
  if (!calls) return '-';
  const avg = totalMs / calls;
  return avg < 1 ? `${avg.toFixed(2)} ms` : `${avg.toFixed(1)} ms`;
}

/**
 * Print a per-phase timing breakdown for one Comunica run.
 *
 *   Phase                            Time      Calls   Avg/call   Share
 *   ---------------------------------------------------------------------
 *   Stratification  (dep. analysis)  35.1 s        1    35.1 s     87%
 *   Rule execution  (CONSTRUCT)       3.9 s    10009     0.4 ms    10%
 *   Store insertion (RdfStore)        0.7 s    10008     0.1 ms     2%
 *   Stream drain    (UnionIterator)   0.2 s        -         -      1%
 *   ---------------------------------------------------------------------
 *   Total                            40.0 s
 */
function printProfile(file, t) {
  const W = 70;
  const rows = [
    { label: 'Stratification  (dep. analysis)', ms: t.stratMs,     calls: 1,                    note: 'O(rules^2) edge scan' },
    { label: 'Rule execution  (CONSTRUCT)',      ms: t.applyRuleMs, calls: t.calls.applyRule,    note: '' },
    { label: 'Store insertion (RdfStore)',        ms: t.insertMs,    calls: t.calls.insertQuads,  note: '' },
    { label: 'Stream drain    (UnionIterator)',   ms: t.drainMs,     calls: null,                 note: '' },
  ];

  console.log('\n  -- Profile: ' + file + ' ' + '-'.repeat(Math.max(2, W - 14 - file.length)));
  console.log('  ' + 'Phase'.padEnd(38) + 'Time'.padStart(9) + '  ' + 'Calls'.padStart(7) + '  ' + 'Avg/call'.padStart(9) + '  ' + 'Share'.padStart(6));
  console.log('  ' + '-'.repeat(W));
  for (const r of rows) {
    const callStr  = r.calls == null ? '-' : String(r.calls);
    const avgStr   = r.calls == null || r.calls === 0 ? '-' : fmtAvg(r.ms, r.calls);
    const shareStr = pct(r.ms, t.totalMs);
    const noteStr  = r.note ? '  <- ' + r.note : '';
    console.log('  ' + r.label.padEnd(38) + fmt(r.ms).padStart(9) + '  ' + callStr.padStart(7) + '  ' + avgStr.padStart(9) + '  ' + shareStr.padStart(5) + noteStr);
  }
  console.log('  ' + '-'.repeat(W));
  console.log('  ' + 'Total'.padEnd(38) + fmt(t.totalMs).padStart(9));
}

// Main
console.log('\nDeep Taxonomy \n');
console.log(
  col('File', 30),
  col('Comunica', 11),
  col('Triples', 8),
  col('CONSTRUCTs', 11),
  col('eyesharl', 11),
  col('Triples', 8),
  col('Iterations', 11),
);
console.log('-'.repeat(95));

patchActor();

for (const file of filteredFiles) {
  const src = readFileSync(join(examplesDir, file), 'utf8');

  let comunica, eye;
  try {
    comunica = await runComunica(src);
  } catch (e) {
    comunica = { ms: NaN, count: 'ERR', constructCalls: '-', timing: null, error: e.message };
  }
  try {
    eye = runEyesharl(src);
  } catch (e) {
    eye = { ms: NaN, count: 'ERR', iterations: '-', error: e.message };
  }

  console.log(
    col(file, 30),
    col(comunica.error ? 'ERR' : fmt(comunica.ms), 11),
    col(comunica.count, 8),
    col(comunica.constructCalls, 11),
    col(eye.error ? 'ERR' : fmt(eye.ms), 11),
    col(eye.count, 8),
    col(eye.iterations, 11),
  );

  if (profileMode && comunica.timing) {
    printProfile(file, comunica.timing);
  }
}

console.log('\nDone.\n');

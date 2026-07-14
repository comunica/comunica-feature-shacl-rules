/**
 * Pre-run all SHACL examples through the Comunica engine and save results as JSON.
 * Run from repo root: node performance/prerun-examples.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore } = require('rdf-stores');

const examplesDir = join(__dirname, 'examples');
const outputFile = join(examplesDir, 'results.json');

const SKIP = new Set([ 'deep-taxonomy-100000.srl', 'deep-taxonomy-10000.srl', 'deep-taxonomy-1000.srl', 'deep-taxonomy-100.srl', 'deep-taxonomy-10.srl', 'sudoku.srl', 'turing.srl', 'gps.srl', 'fibonacci.srl', 'hanoi.srl', 'path-discovery.srl', 'fft32-numeric.srl' ]);

const files = readdirSync(examplesDir)
  .filter(f => f.endsWith('.srl'))
  .filter(f => !SKIP.has(f))
  .sort();

const results = [];
const engine = new QueryEngine();

console.log(`  Pre-running ${files.length} examples...\n`);

for (const file of files) {
  const filepath = join(examplesDir, file);
  const src = readFileSync(filepath, 'utf8');
  const store = RdfStore.createDefault();
  const t0 = performance.now();

  try {
    const stream = await engine.queryQuads(src, {
      sources: [ store ],
      destination: store,
      queryFormat: { language: 'shacl', version: '1.2' },
      baseIRI: pathToFileURL(filepath).href,
    });

    let count = 0;
    await new Promise((resolve, reject) => {
      stream.on('data', () => count++);
      stream.on('error', reject);
      stream.on('end', resolve);
    });

    const ms = Math.round(performance.now() - t0);
    results.push({ file, count, ms, error: null });
    process.stdout.write(`  ✓ ${file.padEnd(45)} ${count} quads  ${ms} ms\n`);
  } catch (err) {
    const ms = Math.round(performance.now() - t0);
    results.push({ file, count: -1, ms, error: err.message });
    process.stdout.write(`  ✗ ${file.padEnd(45)} ERROR: ${err.message.slice(0, 50)}\n`);
  }
}

writeFileSync(outputFile, JSON.stringify(results));
console.log(`\n  Saved ${results.length} results to ${outputFile}`);

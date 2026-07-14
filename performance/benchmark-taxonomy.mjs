/**
 * Deep Taxonomy benchmark.
 *
 * Runs each deep-taxonomy-*.srl file N times through the Comunica SHACL Rules
 * engine and reports per-file statistics: min, max, mean, median, and total
 * inferred triples.
 *
 * Usage:
 *   node performance/benchmark-taxonomy.mjs
 *   node performance/benchmark-taxonomy.mjs --runs 5
 *   node performance/benchmark-taxonomy.mjs --runs 20 --filter 100
 */

import { createRequire } from 'module';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore } = require('rdf-stores');

const examplesDir = join(__dirname, 'examples');

function flagValue(name) {
  const long = process.argv.find(a => a.startsWith(`--${name}=`));
  if (long) return long.split('=')[1];
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1) {
    const next = process.argv[idx + 1];
    if (next && !next.startsWith('--')) return next;
  }
  return null;
}
const runs = parseInt(flagValue('runs') || '10', 10);
const filter = flagValue('filter');
const debugLog = process.argv.includes('--debug');

function getTaxonomyFiles() {
  return readdirSync(examplesDir)
    .filter(f => /^deep-taxonomy-\d+\.srl$/.test(f))
    .filter(f => !filter || f.includes(filter))
    .sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)[1], 10);
      const nb = parseInt(b.match(/(\d+)/)[1], 10);
      return na - nb;
    });
}

async function runOnce(filename) {
  const src = readFileSync(filename, 'utf8');
  const engine = new QueryEngine();
  const store = RdfStore.createDefault();

  if (debugLog) console.error(`\n  [bench] Running ${filename}...`);

  const t0 = performance.now();
  const stream = await engine.queryQuads(src, {
    sources: [store],
    destination: store,
    queryFormat: { language: 'shacl', version: '1.2' },
  });

  let count = 0;
  await new Promise((resolve, reject) => {
    stream.on('data', () => count++);
    stream.on('error', reject);
    stream.on('end', resolve);
  });
  const ms = performance.now() - t0;

  return { ms, count };
}

function stats(times) {
  const sorted = [...times].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[(n - 1) / 2];
  return {
    min: sorted[0],
    max: sorted[n - 1],
    mean,
    median,
  };
}

async function main() {
  const files = getTaxonomyFiles();

  if (files.length === 0) {
    console.error(`No deep-taxonomy files found${filter ? ` matching "${filter}"` : ''}`);
    process.exit(1);
  }

  if (debugLog) {
    console.error(`\n  Found ${files.length} file(s): ${files.join(', ')}`);
    console.error(`  Runs per file: ${runs}\n`);
  }

  console.log(`\n  Deep Taxonomy Benchmark (${runs} runs per file)\n`);

  const colW = [30, 10, 10, 10, 10, 10];
  const hdr = ['File', 'Depth', 'Triples', 'Min (ms)', 'Mean (ms)', 'Median (ms)'];
  const sep = hdr.map((h, i) => '─'.repeat(colW[i])).join('  ');

  console.log('  ' + hdr.map((h, i) => h.padEnd(colW[i])).join('  '));
  console.log('  ' + sep);

  for (const file of files) {
    const depth = file.match(/(\d+)/)[1];
    const filepath = join(examplesDir, file);
    const times = [];
    let tripleCount = 0;

    for (let i = 0; i < runs; i++) {
      try {
        const result = await runOnce(filepath);
        times.push(result.ms);
        tripleCount = result.count;
      } catch (err) {
        times.push(NaN);
      }
    }

    const s = stats(times.filter(t => !isNaN(t)));

    const parts = [
      file.padEnd(colW[0]),
      depth.padStart(colW[1]),
      String(tripleCount).padStart(colW[2]),
      s.min.toFixed(1).padStart(colW[3]),
      s.mean.toFixed(1).padStart(colW[4]),
      s.median.toFixed(1).padStart(colW[5]),
    ];
    process.stdout.write('  ' + parts.join('  '));

    if (times.some(isNaN)) {
      process.stdout.write('  (some runs failed)');
    }
    process.stdout.write('\n');
  }

  console.log('');
}

main();

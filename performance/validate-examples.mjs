/**
 * Validates .srl examples against golden .trig output.
 *
 * Compares Comunica engine output with the expected results in examples/output/.
 *
 * Usage:
 *   node performance/validate-examples.mjs
 *   node performance/validate-examples.mjs --filter family
 *   node performance/validate-examples.mjs --verbose
 */

import { createRequire } from 'module';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { performance } from 'perf_hooks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore } = require('rdf-stores');
const N3 = require('n3');
const { DataFactory: DF } = N3;

const examplesDir = join(__dirname, 'examples');
const goldenDir = join(examplesDir, 'output');
const verbose = process.argv.includes('--verbose');
const filterArg = process.argv.find(a => a.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

const KNOWN_PREFIXES = {
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

function extractPrefixes(src) {
  const prefixes = {};
  const baseMatch = src.match(/^BASE\s+<([^>]+)>/mi);
  if (baseMatch) prefixes[''] = baseMatch[1];
  for (const m of src.matchAll(/^PREFIX\s+(\S*?):?\s*<([^>]+)>/gm)) {
    prefixes[m[1] || ''] = m[2];
  }
  return prefixes;
}

function parseGoldenText(text, allPrefixes) {
  const lines = [];
  for (const [pref, iri] of Object.entries(allPrefixes)) {
    lines.push(`@prefix ${pref}: <${iri}> .`);
  }
  lines.push('');
  lines.push(text);
  const combined = lines.join('\n');

  const parser = new N3.Parser();
  try {
    return { quads: parser.parse(combined), error: null };
  } catch (err) {
    return { quads: null, error: err.message };
  }
}

function parseGolden(goldenFile, srcPrefixes) {
  if (!existsSync(goldenFile)) return { quads: null, error: 'no golden file' };

  const text = readFileSync(goldenFile, 'utf8').trim();
  if (!text) return { quads: [], error: null };

  const allPrefixes = { ...KNOWN_PREFIXES, ...srcPrefixes };
  return parseGoldenText(text, allPrefixes);
}

function getExampleFiles() {
  return readdirSync(examplesDir)
    .filter(f => f.endsWith('.srl'))
    .filter(f => !filter || f.includes(filter))
    .sort();
}

function quadKey(q) {
  return `${q.subject.value}\x00${q.predicate.value}\x00${q.object.value}\x00${q.graph.value}`;
}

async function runComunica(filepath) {
  const src = readFileSync(filepath, 'utf8');
  const engine = new QueryEngine();
  const store = RdfStore.createDefault();

  const t0 = performance.now();
  const stream = await engine.queryQuads(src, {
    sources: [store],
    destination: store,
    queryFormat: { language: 'shacl', version: '1.2' },
    baseIRI: pathToFileURL(filepath).href,
  });

  const quads = [];
  await new Promise((resolve, reject) => {
    stream.on('data', q => quads.push(q));
    stream.on('error', reject);
    stream.on('end', resolve);
  });
  const ms = performance.now() - t0;

  return { quads, ms };
}

function compareQuads(golden, comunica) {
  const goldKeys = new Set(golden.map(quadKey));
  const commKeys = new Set(comunica.map(quadKey));

  const onlyGolden = [...goldKeys].filter(k => !commKeys.has(k));
  const onlyComunica = [...commKeys].filter(k => !goldKeys.has(k));

  return {
    match: onlyGolden.length === 0 && onlyComunica.length === 0,
    goldCount: goldKeys.size,
    commCount: commKeys.size,
    missing: onlyGolden.length,
    extra: onlyComunica.length,
    missingDetails: onlyGolden,
    extraDetails: onlyComunica,
  };
}

async function main() {
  const files = getExampleFiles();
  if (files.length === 0) {
    console.error(`No .srl files found${filter ? ` matching "${filter}"` : ''}`);
    process.exit(1);
  }

  console.log(`\n  Validating ${files.length} examples against golden output\n`);

  const colW = [40, 10, 10, 10, 10, 14];
  const hdr = ['Example', 'Golden', 'Got', 'Missing', 'Extra', 'Time'];
  console.log('  ' + hdr.map((h, i) => i === 0 ? h.padEnd(colW[i]) : h.padStart(colW[i])).join(''));
  console.log('  ' + '─'.repeat(colW.reduce((a, b) => a + b, 0)));

  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let parseErrors = 0;

  for (const file of files) {
    const filepath = join(examplesDir, file);
    const src = readFileSync(filepath, 'utf8');
    const prefixes = extractPrefixes(src);
    const stem = basename(file, extname(file));
    const goldenFile = join(goldenDir, `${stem}.trig`);

    const golden = parseGolden(goldenFile, prefixes);

    if (golden.error) {
      parseErrors++;
      if (verbose) console.log(`  ${file.padEnd(colW[0])}PARSE: ${golden.error.slice(0, 50)}`);
      continue;
    }
    if (golden.quads === null) {
      skipped++;
      if (verbose) console.log(`  ${file.padEnd(colW[0])}NO GOLDEN`);
      continue;
    }

    try {
      const { quads: comunica, ms } = await runComunica(filepath);
      const cmp = compareQuads(golden.quads, comunica);

      const parts = [
        file.padEnd(colW[0]),
        String(cmp.goldCount).padStart(colW[1]),
        String(cmp.commCount).padStart(colW[2]),
        String(cmp.missing).padStart(colW[3]),
        String(cmp.extra).padStart(colW[4]),
        `${ms.toFixed(0)} ms`.padStart(colW[5]),
      ];
      console.log(`  ${parts.join('')}`);

      if (cmp.match) {
        passed++;
      } else {
        failed++;
        if (verbose) {
          for (const k of cmp.missingDetails.slice(0, 5)) {
            console.log(`       missing: ${k.replace(/\x00/g, ' | ')}`);
          }
          for (const k of cmp.extraDetails.slice(0, 5)) {
            console.log(`       extra:   ${k.replace(/\x00/g, ' | ')}`);
          }
        }
      }
    } catch (err) {
      failed++;
      console.log(`  ${file.padEnd(colW[0])}ERROR: ${err.message.slice(0, 55)}`);
    }
  }

  console.log(`\n  ${passed} passed, ${failed} failed, ${skipped} skipped, ${parseErrors} golden-parse-errors\n`);
  process.exit((failed + parseErrors) > 0 ? 1 : 0);
}

main();

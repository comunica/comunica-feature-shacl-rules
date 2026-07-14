/**
 * Test script: runs all .srl examples through the Comunica SHACL Rules engine.
 *
 * Usage:
 *   node performance/test-examples.mjs
 *   node performance/test-examples.mjs --verbose
 *   node performance/test-examples.mjs --filter deep-taxonomy
 */

import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const { QueryEngine } = require('@comunica/query-shacl-rule');
const { RdfStore } = require('rdf-stores');

const examplesDir = join(__dirname, 'examples');
const verbose = process.argv.includes('--verbose');
const filterArg = process.argv.find(a => a.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

// Examples expected to produce an error or empty result
const expectedFailures = new Set([
  'well-formedness-error.srl',
]);

// Examples that use IMPORTS (needs file resolution, skip for now)
const usesImports = new Set([
  'import-main.srl',
  'alignment-demo.srl',
]);

function getSrlFiles() {
  return readdirSync(examplesDir)
    .filter(f => f.endsWith('.srl'))
    .filter(f => !filter || f.includes(filter))
    .filter(f => !usesImports.has(f))
    .sort();
}

async function runExample(filename) {
  const src = readFileSync(filename, 'utf8');
  const engine = new QueryEngine();
  const store = RdfStore.createDefault();

  const stream = await engine.queryQuads(src, {
    sources: [ store ],
    destination: store,
    queryFormat: { language: 'shacl', version: '1.2' },
  });

  let count = 0;
  await new Promise((resolve, reject) => {
    stream.on('data', () => count++);
    stream.on('error', reject);
    stream.on('end', resolve);
  });

  return count;
}

async function main() {
  const files = getSrlFiles();
  if (files.length === 0) {
    console.error(`No .srl files found${filter ? ` matching "${filter}"` : ''} in ${examplesDir}`);
    process.exit(1);
  }

  console.log(`\n  Testing ${files.length} examples with Comunica SHACL Rules\n`);
  console.log(`  ${'Example'.padEnd(45)}${'Result'.padEnd(10)}Triples`);
  console.log(`  ${'-'.repeat(68)}`);

  let passed = 0;
  let failed = 0;

  for (const file of files) {
    const filepath = join(examplesDir, file);
    const isExpectedFail = expectedFailures.has(file);

    try {
      const count = await runExample(filepath);
      if (isExpectedFail) {
        console.log(`  ${file.padEnd(45)}${'OK (empty)'.padEnd(10)}${count}`);
        passed++;
      } else {
        console.log(`  ${file.padEnd(45)}${'PASS'.padEnd(10)}${count}`);
        passed++;
      }
    } catch (err) {
      if (isExpectedFail) {
        console.log(`  ${file.padEnd(45)}${'OK (error)'.padEnd(10)}${err.message.slice(0, 40)}`);
        passed++;
      } else {
        console.log(`  ${file.padEnd(45)}${'FAIL'.padEnd(10)}${err.message.slice(0, 40)}`);
        failed++;
      }
    }
  }

  console.log(`\n  ${'─'.repeat(68)}`);
  console.log(`  ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main();

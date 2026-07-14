# Comunica for SHACL Rules

A monorepo that adds [SHACL Rules](https://www.w3.org/TR/shacl12-rules/) forward-chaining inference support to [Comunica](https://comunica.dev/).

## Packages

| Package | Description |
|---|---|
| `@comunica/query-shacl-rule` | Query engine — runs SHACL Rules documents via `queryQuads()` |
| `@comunica/actor-query-parse-shacl-rule` | Parse actor — converts SRL syntax to SPARQL algebra |
| `@comunica/actor-query-operation-shacl-rule` | Operation actor — SCC-stratified fixpoint inference engine |
| `@comunica/shacl-rule-1-2-parser` | Chevrotain-based SRL parser with Traqula algebra conversion |

## Architecture

```
SRL text  →  shacl-rule-1-2-parser  →  parse actor  →  operation actor  →  inferred quads
                        (Chevrotain AST +             (CONSTRUCT fixpoint
                         Traqula algebra)               with stratification)
```

The operation actor performs dependency analysis (Kosaraju SCC), topological layering (Kahn), and per-layer fixpoint evaluation.

## Setup

```bash
yarn install
```

Builds TypeScript, generates Components.js modules, and compiles the engine config.

## Scripts

| Script | Description |
|---|---|
| `yarn build` | TypeScript + Components.js generation |
| `yarn test` | Jest unit tests (actor + parser) |
| `yarn lint` | ESLint |
| `yarn test:examples` | Run all `.srl` examples from eyeleng through the engine |
| `yarn benchmark` | Full deep-taxonomy benchmark (eyesharl comparison) |
| `yarn benchmark:taxonomy` | Deep-taxonomy timing benchmark (default 10 runs, configurable with `--runs=N` and `--filter=NAME`) |

## Usage

```typescript
import { QueryEngine } from '@comunica/query-shacl-rule';
import { Store } from 'n3';

const store = new Store();
const engine = new QueryEngine();

const result = await engine.queryQuads(shaclInput, {
  sources: [store],
  queryFormat: { language: 'shacl', version: '1.2' },
});
```

## Examples

The `performance/examples/` directory contains 62 runnable `.srl` files from [eyeleng](https://github.com/eyereasoner/eyeleng), covering the W3C SHACL 1.2 Rules spec examples plus additional inference benchmarks (deep taxonomy, family relations, path discovery, etc.).

```bash
yarn test:examples --filter family
```

## Benchmark

```bash
# Run deep-taxonomy-10 through deep-taxonomy-100000, 10 iterations each
yarn benchmark:taxonomy

# 20 iterations, only the 1000-depth file
yarn benchmark:taxonomy --runs 20 --filter 1000
```

Output columns: file, depth, inferred triples, min/mean/median time in ms.

## Related

- [eyeleng](https://github.com/eyereasoner/eyeleng) — standalone JavaScript SHACL Rules engine
- [Comunica](https://comunica.dev/) — SPARQL query engine framework
- [SHACL 1.2 Rules](https://www.w3.org/TR/shacl12-rules/) — W3C draft specification

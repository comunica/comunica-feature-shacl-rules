# Comunica SPARQL SHACL Rules

A Comunica query engine for executing SHACL Rules.

This engine supports the SHACL Rules query format — documents containing `DATA` blocks and `RULE/WHERE` blocks — and returns inferred quads via forward-chaining inference with stratification and fixpoint evaluation.

## Usage

```javascript
import {QueryEngine} from '@comunica/query-shacl-rule';
import {Store} from 'n3';

const store = new Store();

const shaclInput = `
PREFIX : <http://example/>

DATA {
  :alice :parent :bob .
  :bob   :parent :carol .
}

RULE { ?grandParent :ancestor ?grandChild . }
WHERE {
  ?grandParent :parent ?parent .
  ?parent      :parent ?grandChild .
}
`;

const engine = new QueryEngine();

const quadStream = await engine.queryQuads(shaclInput, {
    sources: [store],
    queryFormat: {language: 'shacl', version: '1.0'},
});

for await (const quad of quadStream) {
    console.log(quad.subject.value, quad.predicate.value, quad.object.value);
}
```

## Dynamic instantiation

```javascript
import {QueryEngineFactory} from '@comunica/query-shacl-rule';

const engine = await new QueryEngineFactory().create();
```

## CLI

```bash
$ comunica-shacl-rule https://example.org/data RULE { ?s ?p ?o } WHERE { ?s ?p ?o }
```

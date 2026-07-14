# Comunica Shacl Rule Query Operation Actor

A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor that handles SPARQL shacl-rule operations for forward-chaining inference.

This module is part of the [Comunica framework](https://github.com/comunica/comunica),
and should only be used by [developers that want to build their own query engine](https://comunica.dev/docs/modify/).

## Install

```bash
$ yarn add @comunica/actor-query-operation-shacl-rule
```

## Configure

After installing, this package can be added to your engine's configuration as follows:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-query-operation-shacl-rule/^1.0.0/components/context.jsonld"
  ],
  "actors": [
    {
      "@id": "urn:comunica:default:query-operation/actors#shacl-rule",
      "@type": "ActorQueryOperationShaclRule",
      "mediatorQueryOperation": { "@id": "urn:comunica:default:query-operation/mediators#main" },
      "mediatorUpdateQuads": { "@id": "urn:comunica:default:rdf-update-quads/mediators#main" }
    }
  ]
}
```

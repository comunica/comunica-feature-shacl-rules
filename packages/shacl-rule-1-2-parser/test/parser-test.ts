import type { SparqlContext } from '@traqula/rules-sparql-1-2';
import { AstFactory, completeParseContext } from '@traqula/rules-sparql-1-2';
import { ShaclParser, toShaclAlgebra } from '../lib/index';

const parser = new ShaclParser();

function parseContext(): SparqlContext {
  return completeParseContext({ astFactory: new AstFactory() });
}

describe('shaclParser', () => {
  it('parses a basic SHACL rule', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . FILTER (?a >= 18) }`,
      parseContext(),
    );
    expect(result.type).toBe('RuleOrDataBlock');
    expect(result.elements).toHaveLength(1);
    expect(result.elements[0].type).toBe('shaclRule');
  });

  it('parses a SHACL data block', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       DATA { :x :p 1 . }`,
      parseContext(),
    );
    expect(result.type).toBe('RuleOrDataBlock');
    expect(result.elements).toHaveLength(1);
    expect(result.elements[0].type).toBe('shaclData');
  });

  it('parses an IF-THEN rule', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       IF { ?x :age ?a . FILTER (?a >= 18) } THEN { ?x :adult true . }`,
      parseContext(),
    );
    expect(result.type).toBe('RuleOrDataBlock');
    expect(result.elements).toHaveLength(1);
    expect(result.elements[0].type).toBe('shaclRule');
  });

  it('parses an IMPORTS declaration', () => {
    const result = parser.parse(
      `IMPORTS <http://example/ontology>
       PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . FILTER (?a >= 18) }`,
      parseContext(),
    );
    expect(result.type).toBe('RuleOrDataBlock');
    expect(result.initialPrologue.some(p => p.subType === 'import')).toBe(true);
  });
});

describe('toShaclAlgebra', () => {
  it('translates a parsed SHACL rule set to algebra', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . FILTER (?a >= 18) }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toBeInstanceOf(Array);
    expect(algebra).toHaveLength(1);
    expect(algebra[0].type).toBe('shaclRule');
  });
});

describe('path expressions — valid SHACL subsets', () => {
  it('accepts a simple IRI predicate', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result true . } WHERE { ?x :p ?y . }`,
      parseContext(),
    )).not.toThrow();
  });

  it('accepts the "a" keyword as predicate', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :isTyped true . } WHERE { ?x a :C . }`,
      parseContext(),
    )).not.toThrow();
  });

  it('accepts a sequence path ( :a/:b )', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?z . } WHERE { ?x :a/:b ?z . }`,
      parseContext(),
    )).not.toThrow();
  });

  it('accepts an inverse path ( ^:a )', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x ^:a ?y . }`,
      parseContext(),
    )).not.toThrow();
  });

  it('accepts a grouped sequence path ( (:a/:b) )', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?z . } WHERE { ?x (:a/:b) ?z . }`,
      parseContext(),
    )).not.toThrow();
  });
});

describe('path expressions — forbidden SPARQL features (negative tests)', () => {
  it('rejects path alternation ( :a|:b ) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :a|:b ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects optional path modifier ( :a? ) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :a? ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects zero-or-more path modifier ( :a* ) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :a* ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects one-or-more path modifier ( :a+ ) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :a+ ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects negated property set ( !:a ) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x !:a ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects path alternation inside NOT { } negation block', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result true . } WHERE { ?x :p ?v . NOT { ?x :a|:b ?y . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects one-or-more path modifier inside NOT { } negation block', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result true . } WHERE { ?x :p ?v . NOT { ?x :a+ ?y . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects IF-THEN rule with path alternation in body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       IF { ?x :a|:b ?y . } THEN { ?x :result ?y . }`,
      parseContext(),
    )).toThrow();
  });
});

describe('forbidden built-in functions (negative tests)', () => {
  it('rejects BOUND() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(BOUND(?y)) }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects RAND() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(RAND() > 0.5) }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects MD5() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(MD5(?y) = "abc") }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects SHA1() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(SHA1(?y) = "abc") }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects SHA256() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(SHA256(?y) = "abc") }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects COALESCE() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(COALESCE(?y, 0) = 0) }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects EXISTS {} in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(EXISTS { ?x :q ?z . }) }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects NOT EXISTS {} in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER NOT EXISTS { ?x :q ?z . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects COUNT aggregate in FILTER expression', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(COUNT(*) > 0) }`,
      parseContext(),
    )).toThrow();
  });
});

describe('forbidden graph patterns (negative tests)', () => {
  it('rejects OPTIONAL { } in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . OPTIONAL { ?x :q ?z . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects UNION in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { { ?x :a ?y . } UNION { ?x :b ?y . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects MINUS { } in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . MINUS { ?x :q ?z . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects VALUES in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { VALUES ?x { :a } ?x :p ?y . }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects SERVICE { } in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . SERVICE <http://example/sparql> { ?x :q ?z . } }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects GRAPH { } in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { GRAPH :g { ?x :p ?y . } }`,
      parseContext(),
    )).toThrow();
  });
});

describe('declarations (positive tests)', () => {
  it('parses a TRANSITIVE declaration', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       TRANSITIVE(:p)`,
      parseContext(),
    );
    expect(result.type).toBe('RuleOrDataBlock');
    expect(result.elements).toHaveLength(1);
    const decl = result.elements[0] as any;
    expect(decl.type).toBe('shaclDeclaration');
    expect(decl.declarationType).toBe('transitive');
    expect(decl.args).toHaveLength(1);
  });

  it('parses a SYMMETRIC declaration', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       SYMMETRIC(:sibling)`,
      parseContext(),
    );
    expect(result.elements[0]).toMatchObject({
      type: 'shaclDeclaration',
      declarationType: 'symmetric',
    });
  });

  it('parses an INVERSE declaration', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       INVERSE(:parent, :child)`,
      parseContext(),
    );
    const decl = result.elements[0] as any;
    expect(decl.type).toBe('shaclDeclaration');
    expect(decl.declarationType).toBe('inverse');
    expect(decl.args).toHaveLength(2);
  });
});

describe('prologue declarations (positive tests)', () => {
  it('parses a VERSION declaration', () => {
    const result = parser.parse(
      `VERSION "1.0"
       PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . }`,
      parseContext(),
    );
    expect(result.initialPrologue.some((p: any) => p.subType === 'version')).toBe(true);
  });

  it('parses a BASE declaration', () => {
    expect(() => parser.parse(
      `BASE <http://example/>
       RULE { ?x <adult> true . } WHERE { ?x <age> ?a . }`,
      parseContext(),
    )).not.toThrow();
  });
});

describe('rule body features (positive tests)', () => {
  it('parses BIND (assignment) in rule body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :km ?km . } WHERE { ?x :miles ?m . BIND(?m * 1.60934 AS ?km) }`,
      parseContext(),
    )).not.toThrow();
  });

  it('parses multiple rules in a single rule set', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :childOf ?y . } WHERE { ?y :fatherOf ?x . }
       RULE { ?x :childOf ?y . } WHERE { ?y :motherOf ?x . }`,
      parseContext(),
    );
    expect(result.elements).toHaveLength(2);
    expect(result.elements.every((e: any) => e.type === 'shaclRule')).toBe(true);
  });

  it('parses a rule set with a rule and a data block', () => {
    const result = parser.parse(
      `PREFIX : <http://example/>
       DATA { :a :p 1 . }
       RULE { ?x :adult true . } WHERE { ?x :age ?a . FILTER(?a >= 18) }`,
      parseContext(),
    );
    expect(result.elements).toHaveLength(2);
    expect((result.elements[0] as any).type).toBe('shaclData');
    expect((result.elements[1] as any).type).toBe('shaclRule');
  });

  it('parses NOT { } negation with a FILTER inside', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :unclassified true . } WHERE {
         ?x :p ?v .
         NOT { ?x :q ?w . FILTER(?w > 10) }
       }`,
      parseContext(),
    )).not.toThrow();
  });

  it('parses a rule with a sequence path in the body', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?z . } WHERE { ?x :a/:b/:c ?z . }`,
      parseContext(),
    )).not.toThrow();
  });

  it('allows NOW() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
       PREFIX : <http://example/>
       RULE { ?x :isCurrent true . } WHERE { ?x :date ?d . FILTER(?d >= NOW()) }`,
      parseContext(),
    )).not.toThrow();
  });
});

describe('forbidden built-in functions — SHA384 / SHA512 (negative tests)', () => {
  it('rejects SHA384() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(SHA384(?y) = "abc") }`,
      parseContext(),
    )).toThrow();
  });

  it('rejects SHA512() in FILTER', () => {
    expect(() => parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :result ?y . } WHERE { ?x :p ?y . FILTER(SHA512(?y) = "abc") }`,
      parseContext(),
    )).toThrow();
  });
});

describe('toShaclAlgebra — rule body algebra', () => {
  it('translates a rule with only triples to a bgp input', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toHaveLength(1);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('bgp');
    expect(rule.input.patterns).toHaveLength(1);
  });

  it('translates a rule with FILTER to a filter node wrapping bgp', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . FILTER(?a >= 18) }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('filter');
    expect(rule.input.input.type).toBe('bgp');
    expect(rule.input.expression.operator).toBe('>=');
  });

  it('translates a rule with BIND to an extend node', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :km ?km . } WHERE { ?x :miles ?m . BIND(?m * 1.60934 AS ?km) }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('extend');
    expect(rule.input.variable.value).toBe('km');
    expect(rule.input.expression.operator).toBe('*');
  });

  it('translates a rule with NOT { } to a minus node', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :type :Large . } WHERE { ?x :size ?s . NOT { ?x :classified ?c . } }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('minus');
  });

  it('translates an IF-THEN rule to a shaclRule', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       IF { ?x :age ?a . FILTER(?a > 18) } THEN { ?x :adult true . }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('filter');
    expect(rule.template).toHaveLength(1);
  });

  it('translates a data block to an array of quads', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       DATA { :alice :age 30 . :bob :age 25 . }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toHaveLength(1);
    const triples = algebra[0] as any[];
    expect(Array.isArray(triples)).toBe(true);
    expect(triples).toHaveLength(2);
    expect(triples[0].termType).toBe('Quad');
  });

  it('expands a TRANSITIVE declaration into a rule with correct body and template', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       TRANSITIVE(:p)`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toHaveLength(1);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.type).toBe('bgp');
    expect(rule.input.patterns).toHaveLength(2);
    expect(rule.template).toHaveLength(1);
    // Body: ?X :p ?Y . ?Y :p ?Z
    expect(rule.input.patterns[0].subject.value).toBe('X');
    expect(rule.input.patterns[0].predicate.value).toBe('http://example/p');
    expect(rule.input.patterns[0].object.value).toBe('Y');
    expect(rule.input.patterns[1].subject.value).toBe('Y');
    expect(rule.input.patterns[1].predicate.value).toBe('http://example/p');
    expect(rule.input.patterns[1].object.value).toBe('Z');
    // Template: ?X :p ?Z
    expect(rule.template[0].subject.value).toBe('X');
    expect(rule.template[0].predicate.value).toBe('http://example/p');
    expect(rule.template[0].object.value).toBe('Z');
  });

  it('expands a SYMMETRIC declaration into a rule with swapped body subject/object', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       SYMMETRIC(:sibling)`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.type).toBe('shaclRule');
    expect(rule.input.patterns).toHaveLength(1);
    expect(rule.template).toHaveLength(1);
    // Body: ?Y :sibling ?X
    expect(rule.input.patterns[0].subject.value).toBe('Y');
    expect(rule.input.patterns[0].predicate.value).toBe('http://example/sibling');
    expect(rule.input.patterns[0].object.value).toBe('X');
    // Template: ?X :sibling ?Y
    expect(rule.template[0].subject.value).toBe('X');
    expect(rule.template[0].predicate.value).toBe('http://example/sibling');
    expect(rule.template[0].object.value).toBe('Y');
  });

  it('expands an INVERSE declaration into two rules with correct predicates', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       INVERSE(:parent, :child)`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toHaveLength(2);

    // Rule 1: body ?Y :parent ?X → template ?X :child ?Y
    const r1 = algebra[0];
    expect(r1.type).toBe('shaclRule');
    expect(r1.input.patterns[0].subject.value).toBe('Y');
    expect(r1.input.patterns[0].predicate.value).toBe('http://example/parent');
    expect(r1.input.patterns[0].object.value).toBe('X');
    expect(r1.template[0].subject.value).toBe('X');
    expect(r1.template[0].predicate.value).toBe('http://example/child');
    expect(r1.template[0].object.value).toBe('Y');

    // Rule 2: body ?Y :child ?X → template ?X :parent ?Y
    const r2 = algebra[1];
    expect(r2.type).toBe('shaclRule');
    expect(r2.input.patterns[0].subject.value).toBe('Y');
    expect(r2.input.patterns[0].predicate.value).toBe('http://example/child');
    expect(r2.input.patterns[0].object.value).toBe('X');
    expect(r2.template[0].subject.value).toBe('X');
    expect(r2.template[0].predicate.value).toBe('http://example/parent');
    expect(r2.template[0].object.value).toBe('Y');
  });

  it('resolves named prefixes in declaration IRIs', () => {
    const ast = parser.parse(
      `PREFIX ex: <http://example.org/>
       TRANSITIVE(ex:knows)`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.input.patterns[0].predicate.value).toBe('http://example.org/knows');
    expect(rule.input.patterns[1].predicate.value).toBe('http://example.org/knows');
    expect(rule.template[0].predicate.value).toBe('http://example.org/knows');
  });

  it('expands multiple declarations mixed with DATA into rules', () => {
    const ast = parser.parse(
      `PREFIX : <http://ex/>
       DATA { :a :p :b . :b :p :c . }
       TRANSITIVE(:p)
       SYMMETRIC(:q)`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    // DATA (array of quads) + 2 rules (transitive + symmetric)
    expect(algebra).toHaveLength(3);
    expect(Array.isArray(algebra[0])).toBe(true);
    expect(algebra[1].type).toBe('shaclRule');
    expect(algebra[2].type).toBe('shaclRule');
  });

  it('translates multiple rules to an array of shaclRule entries', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :childOf ?y . } WHERE { ?y :fatherOf ?x . }
       RULE { ?x :childOf ?y . } WHERE { ?y :motherOf ?x . }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    expect(algebra).toHaveLength(2);
    expect(algebra.every((r: any) => r.type === 'shaclRule')).toBe(true);
  });

  it('produces correct head template quads', () => {
    const ast = parser.parse(
      `PREFIX : <http://example/>
       RULE { ?x :adult true . } WHERE { ?x :age ?a . }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.template).toHaveLength(1);
    const quad = rule.template[0];
    expect(quad.termType).toBe('Quad');
    expect(quad.subject.value).toBe('x');
    expect(quad.predicate.value).toBe('http://example/adult');
  });

  it('correctly resolves prefixes in the head and body', () => {
    const ast = parser.parse(
      `PREFIX ex: <http://example.org/>
       RULE { ?x ex:km ?km . } WHERE { ?x ex:miles ?m . BIND(?m * 1.60934 AS ?km) }`,
      parseContext(),
    );
    const algebra = toShaclAlgebra(ast);
    const rule = algebra[0];
    expect(rule.template[0].predicate.value).toBe('http://example.org/km');
    expect(rule.input.input.patterns[0].predicate.value).toBe('http://example.org/miles');
  });
});

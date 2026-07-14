import { ActionContext, Bus } from '@comunica/core';
import { getSafeQuads } from '@comunica/utils-query-operation';
import arrayifyStream from 'arrayify-stream';
import { ArrayIterator } from 'asynciterator';
import { Store, DataFactory } from 'n3';
import { ActorQueryOperationShaclRule } from '../lib/ActorQueryOperationShaclRule';
import '@comunica/utils-jest';

const DF = DataFactory;

describe('ActorQueryOperationShaclRule', () => {
  let bus: any;
  let mediatorQueryOperation: any;
  let mediatorUpdateQuads: any;

  const q1 = DF.quad(DF.namedNode('s'), DF.namedNode('p'), DF.literal('o'), DF.defaultGraph());
  const q2 = DF.quad(DF.namedNode('s2'), DF.namedNode('p2'), DF.literal('o2'), DF.defaultGraph());
  const q1duplicate = DF.quad(DF.namedNode('s'), DF.namedNode('p'), DF.literal('o'), DF.defaultGraph());
  const dataQuad = DF.quad(DF.namedNode('http://example/s'), DF.namedNode('http://example/p'), DF.namedNode('http://example/o'));

  beforeEach(() => {
    bus = new Bus({ name: 'bus' });

    mediatorQueryOperation = {
      mediate: jest.fn(),
    };

    mediatorUpdateQuads = {
      mediate: jest.fn().mockResolvedValue({
        execute: async() => {},
      }),
    };
  });

  describe('An ActorQueryOperationShaclRule instance', () => {
    let actor: ActorQueryOperationShaclRule;

    beforeEach(() => {
      actor = new ActorQueryOperationShaclRule({
        name: 'actor',
        bus,
        mediatorQueryOperation,
        mediatorUpdateQuads,
      });
    });

    it('should test on shaclRule', async() => {
      const op: any = { operation: { type: 'shaclRule' }};
      await expect(actor.test(op)).resolves.toPassTestVoid();
    });

    it('should not test on non-shaclRule', async() => {
      const op: any = { operation: { type: 'some-other-type' }};
      await expect(actor.test(op)).resolves.toFailTest(
        'Actor actor only supports shaclRule operations, but got some-other-type',
      );
    });

    it('should handle DATA-only document with no rules', async() => {
      mediatorUpdateQuads.mediate.mockResolvedValue({
        execute: async() => {},
      });

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [ dataQuad ],
          rules: [],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor.run(op, undefined));

      expect(output.type).toBe('quads');
      await expect(arrayifyStream(output.quadStream)).resolves.toEqual([]);
      expect(mediatorUpdateQuads.mediate).toHaveBeenCalledTimes(1);
      expect(mediatorQueryOperation.mediate).not.toHaveBeenCalled();
    });

    it('should propagate errors from CONSTRUCT execution', async() => {
      mediatorQueryOperation.mediate.mockRejectedValueOnce(new Error('CONSTRUCT failed'));

      const p: any = {
        type: 'pattern',
        subject: DF.variable('X'),
        predicate: DF.namedNode('http://example.org/p'),
        object: DF.variable('Y'),
        graph: DF.defaultGraph(),
      };

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [{ input: { type: 'bgp', patterns: [p] }, template: [p] }],
        },
        context: new ActionContext(),
      };

      await expect(actor.run(op, undefined)).rejects.toThrow('CONSTRUCT failed');
    });

    it('should run a single iteration and stop at fixpoint if no new data triggers it', async() => {
      mediatorQueryOperation.mediate
        .mockResolvedValueOnce({
          quadStream: new ArrayIterator([ q1, q1duplicate ], { autoStart: false }),
          metadata: () => Promise.resolve({ totalItems: 1 }),
          type: 'quads',
        });

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [{ input: { type: 'bgp', patterns: []}, template: []}],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor.run(op, undefined));

      expect(output.type).toBe('quads');
      await expect(arrayifyStream(output.quadStream)).resolves.toEqual([ q1 ]);
      expect(mediatorQueryOperation.mediate).toHaveBeenCalledTimes(1);
      expect(mediatorUpdateQuads.mediate).toHaveBeenCalledTimes(1);
    });

    it('should successfully perform inference (cascade) over multiple iterations', async() => {
      mediatorQueryOperation.mediate
        .mockResolvedValueOnce({
          quadStream: new ArrayIterator([ q1 ], { autoStart: false }),
          metadata: () => Promise.resolve({ totalItems: 1 }),
          type: 'quads',
        })
        .mockResolvedValueOnce({
          quadStream: new ArrayIterator([ q2 ], { autoStart: false }),
          metadata: () => Promise.resolve({ totalItems: 1 }),
          type: 'quads',
        })
        .mockResolvedValueOnce({
          quadStream: new ArrayIterator([], { autoStart: false }),
          metadata: () => Promise.resolve({ totalItems: 0 }),
          type: 'quads',
        });

      const relPred = DF.namedNode('http://example.org/rel');
      const selfRecursivePattern: any = {
        type: 'pattern',
        subject: DF.variable('X'),
        predicate: relPred,
        object: DF.variable('Y'),
        graph: DF.defaultGraph(),
      };

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [{
            input: { type: 'bgp', patterns: [ selfRecursivePattern ]},
            template: [ selfRecursivePattern ],
          }],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor.run(op, undefined));

      await expect(arrayifyStream(output.quadStream)).resolves.toEqual([ q1, q2 ]);
      expect(mediatorQueryOperation.mediate).toHaveBeenCalledTimes(3);
      expect(mediatorUpdateQuads.mediate).toHaveBeenCalledTimes(2);
    });

    it('should not create a self-dependency when body has concrete term but head has blank node (single pass)', async() => {
      mediatorQueryOperation.mediate
        .mockResolvedValueOnce({
          quadStream: new ArrayIterator([ q1 ], { autoStart: false }),
          metadata: () => Promise.resolve({ totalItems: 1 }),
          type: 'quads',
        });

      const concreteSubj = DF.namedNode('http://example.org/subj');

      const bodyPat: any = {
        type: 'pattern',
        subject: concreteSubj,
        predicate: DF.namedNode('http://example.org/p'),
        object: DF.variable('Y'),
        graph: DF.defaultGraph(),
      };

      const headPat: any = {
        type: 'pattern',
        subject: DF.blankNode('x'),
        predicate: DF.namedNode('http://example.org/p'),
        object: DF.variable('Y'),
        graph: DF.defaultGraph(),
      };

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [{ input: { type: 'bgp', patterns: [bodyPat] }, template: [headPat] }],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor.run(op, undefined));

      await expect(arrayifyStream(output.quadStream)).resolves.toEqual([ q1 ]);
      expect(mediatorQueryOperation.mediate).toHaveBeenCalledTimes(1);
      expect(mediatorUpdateQuads.mediate).toHaveBeenCalledTimes(1);
    });
  });

  describe('ActorQueryOperationShaclRule (Cross-rule fixpoint / deep taxonomy)', () => {
    let bus2: any;
    let store2: Store;
    let actor2: ActorQueryOperationShaclRule;
    let mediatorUpdateQuads2: any;
    let mediatorQueryOperation2: any;

    const ex2 = (name: string) => DF.namedNode(`http://example/${name}`);
    const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

    beforeEach(() => {
      bus2 = new Bus({ name: 'bus2' });
      store2 = new Store();
      store2.addQuad(DF.quad(ex2('ind'), DF.namedNode(rdfType), ex2('N0')));

      mediatorUpdateQuads2 = {
        mediate: jest.fn().mockImplementation(async(action: any) => ({
          execute: async() => {
            const quadsToAdd = await arrayifyStream(action.quadStreamInsert);
            store2.addQuads(quadsToAdd);
          },
        })),
      };

      mediatorQueryOperation2 = { mediate: jest.fn() };

      actor2 = new ActorQueryOperationShaclRule({
        name: 'actor2',
        bus: bus2,
        mediatorQueryOperation: mediatorQueryOperation2,
        mediatorUpdateQuads: mediatorUpdateQuads2,
      });
    });

    it('should infer 5 triples in a single stratified pass (3 CONSTRUCT calls)', async() => {
      const rdf = rdfType;
      const ind = ex2('ind');
      const N10 = ex2('N10');
      const I10 = ex2('I10');
      const J10 = ex2('J10');
      const A2 = ex2('A2');
      const test = ex2('test');
      const is = ex2('is');
      const trueNode = DF.literal('true', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));

      mediatorQueryOperation2.mediate
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator([
            DF.quad(ind, DF.namedNode(rdf), N10),
            DF.quad(ind, DF.namedNode(rdf), I10),
            DF.quad(ind, DF.namedNode(rdf), J10),
          ], { autoStart: false }),
          metadata: async() => ({ cardinality: { type: 'estimate', value: 3 }}),
        })
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator([
            DF.quad(ind, DF.namedNode(rdf), A2),
          ], { autoStart: false }),
          metadata: async() => ({ cardinality: { type: 'estimate', value: 1 }}),
        })
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator([
            DF.quad(test, is, trueNode),
          ], { autoStart: false }),
          metadata: async() => ({ cardinality: { type: 'estimate', value: 1 }}),
        });

      const varX: any = { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('A2'), graph: DF.defaultGraph() };
      const varN0: any = { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('N0'), graph: DF.defaultGraph() };
      const varN10: any = { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('N10'), graph: DF.defaultGraph() };

      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [
            {
              input: { type: 'bgp', patterns: [ varX ]},
              template: [{ type: 'pattern', subject: test, predicate: is, object: trueNode, graph: DF.defaultGraph() }],
            },
            {
              input: { type: 'bgp', patterns: [ varN0 ]},
              template: [
                { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('N10'), graph: DF.defaultGraph() },
                { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('I10'), graph: DF.defaultGraph() },
                { type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('J10'), graph: DF.defaultGraph() },
              ],
            },
            {
              input: { type: 'bgp', patterns: [ varN10 ]},
              template: [{ type: 'pattern', subject: DF.variable('X'), predicate: DF.namedNode(rdf), object: ex2('A2'), graph: DF.defaultGraph() }],
            },
          ],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor2.run(op, undefined));
      const inferred = await arrayifyStream(output.quadStream);

      expect(inferred).toHaveLength(5);
      expect(inferred).toContainEqual(DF.quad(ind, DF.namedNode(rdf), N10));
      expect(inferred).toContainEqual(DF.quad(ind, DF.namedNode(rdf), I10));
      expect(inferred).toContainEqual(DF.quad(ind, DF.namedNode(rdf), J10));
      expect(inferred).toContainEqual(DF.quad(ind, DF.namedNode(rdf), A2));
      expect(inferred).toContainEqual(DF.quad(test, is, trueNode));

      expect(mediatorQueryOperation2.mediate).toHaveBeenCalledTimes(3);
    });
  });

  describe('ActorQueryOperationShaclRule (Dynamic Inference Test)', () => {
    let bus: any;
    let mediatorQueryOperation: any;
    let mediatorUpdateQuads: any;
    let store: Store;
    let actor: ActorQueryOperationShaclRule;

    const ex = (name: string) => DF.namedNode(`http://example.org/${name}`);

    beforeEach(() => {
      bus = new Bus({ name: 'bus' });
      store = new Store();

      store.addQuad(DF.quad(ex('Alice'), ex('ancestor'), ex('Bob')));
      store.addQuad(DF.quad(ex('Bob'), ex('ancestor'), ex('Charlie')));
      store.addQuad(DF.quad(ex('Charlie'), ex('ancestor'), ex('Dave')));

      mediatorQueryOperation = { mediate: jest.fn() };

      mediatorUpdateQuads = {
        mediate: jest.fn().mockImplementation(async(action: any) => ({
          execute: async() => {
            const quadsToAdd = await arrayifyStream(action.quadStreamInsert);
            store.addQuads(quadsToAdd);
          },
        })),
      };

      actor = new ActorQueryOperationShaclRule({
        name: 'actor',
        bus,
        mediatorQueryOperation,
        mediatorUpdateQuads,
      });
    });

    it('should successfully cascade inferences until fixpoint saturation', async() => {
      const iter1 = [
        DF.quad(ex('Alice'), ex('ancestor'), ex('Charlie')),
        DF.quad(ex('Bob'), ex('ancestor'), ex('Dave')),
      ];
      const iter2 = [ DF.quad(ex('Alice'), ex('ancestor'), ex('Dave')) ];
      const iter3: any[] = [];

      mediatorQueryOperation.mediate
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator(iter1, { autoStart: false }),
          metadata: async() => ({ totalItems: iter1.length }),
        })
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator(iter2, { autoStart: false }),
          metadata: async() => ({ totalItems: iter2.length }),
        })
        .mockResolvedValueOnce({
          type: 'quads',
          quadStream: new ArrayIterator(iter3, { autoStart: false }),
          metadata: async() => ({ totalItems: 0 }),
        });

      const ancestorPred = ex('ancestor');
      const op: any = {
        operation: {
          type: 'shaclRule',
          data: [],
          rules: [{
            input: {
              type: 'bgp',
              patterns: [
                { type: 'pattern', subject: DF.variable('X'), predicate: ancestorPred, object: DF.variable('Y'), graph: DF.defaultGraph() },
                { type: 'pattern', subject: DF.variable('Y'), predicate: ancestorPred, object: DF.variable('Z'), graph: DF.defaultGraph() },
              ],
            },
            template: [
              { type: 'pattern', subject: DF.variable('X'), predicate: ancestorPred, object: DF.variable('Z'), graph: DF.defaultGraph() },
            ],
          }],
        },
        context: new ActionContext(),
      };

      const output = getSafeQuads(await actor.run(op, undefined));
      const inferredQuads = await arrayifyStream(output.quadStream);

      expect(inferredQuads).toHaveLength(iter1.length + iter2.length);
      for (const quad of [ ...iter1, ...iter2 ]) {
        expect(inferredQuads).toContainEqual(quad);
      }

      expect(mediatorQueryOperation.mediate).toHaveBeenCalledTimes(3);
      expect(mediatorUpdateQuads.mediate).toHaveBeenCalledTimes(2);

      expect(store.countQuads(ex('Alice'), ex('ancestor'), ex('Charlie'), null)).toBe(1);
      expect(store.countQuads(ex('Bob'), ex('ancestor'), ex('Dave'), null)).toBe(1);
      expect(store.countQuads(ex('Alice'), ex('ancestor'), ex('Dave'), null)).toBe(1);
    });
  });

  describe('Traqula algebra integration (parse actor → operation actor)', () => {
    it('should detect edges in a chain parsed via ShaclParser', async() => {
      const { ShaclParser, toShaclAlgebra } = require('@comunica/shacl-rule-1-2-parser');
      const { AstFactory, completeParseContext } = require('@traqula/rules-sparql-1-2');
      const parser = new ShaclParser();

      const src = `PREFIX : <http://example/>
DATA { :ind a :N0 . }
RULE { ?X a :N1 . } WHERE { ?X a :N0 . }
RULE { ?X a :N2 . } WHERE { ?X a :N1 . }
RULE { :test :is true . } WHERE { ?X a :N2 . }`;

      const ast = parser.parse(src, completeParseContext({ astFactory: new AstFactory() }));
      const elements = toShaclAlgebra(ast);

      const rules: any[] = [];
      for (const el of elements) {
        if (el && el.type === 'shaclRule') rules.push(el);
      }

      expect(rules).toHaveLength(3);

      const bus = new Bus({ name: 'bus' });
      let callCount = 0;
      const actor = new ActorQueryOperationShaclRule({
        name: 'actor',
        bus,
        mediatorQueryOperation: {
          mediate: () => {
            callCount++;
            return Promise.resolve({
              type: 'quads',
              quadStream: new ArrayIterator([], { autoStart: false }),
              metadata: async() => ({}),
            });
          },
        },
        mediatorUpdateQuads: {
          mediate: () => Promise.resolve({ execute: async() => {} }),
        },
      });

      const op: any = {
        operation: { type: 'shaclRule', data: [], rules },
        context: new ActionContext(),
      };

      await actor.run(op, undefined);

      // Stratified chain: Rule0(N0→N1) → Rule1(N1→N2) → Rule2(N2→:test)
      // 3 rules, 3 CONSTRUCT calls in topological order
      expect(callCount).toBe(3);
    });
  });
});

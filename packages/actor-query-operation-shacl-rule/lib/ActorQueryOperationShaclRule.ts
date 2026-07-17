import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfUpdateQuads } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import { passTestVoid } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra as AlgebraType } from '@comunica/utils-algebra';
import { Algebra } from '@comunica/utils-algebra';
import { getSafeQuads } from '@comunica/utils-query-operation';
import type * as RDF from '@rdfjs/types';
import { ArrayIterator } from 'asynciterator';

export interface ShaclRulesDocument {
  type: 'shaclRule';
  data: RDF.Quad[];
  rules: { input: AlgebraType.Operation; template: AlgebraType.Pattern[] }[];
}

type DepEdge = { from: number; to: number };

function quadKey(q: RDF.Quad): string {
  return `${q.subject.value}\x00${q.predicate.value}\x00${q.object.value}\x00${q.graph.value}`;
}

function extractBodyPatterns(op: AlgebraType.Operation): AlgebraType.Pattern[] {
  const result: AlgebraType.Pattern[] = [];
  const stack: AlgebraType.Operation[] = [ op ];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.type === Algebra.Types.BGP) {
      for (const pat of (node as AlgebraType.Bgp).patterns) {
        result.push(pat);
      }
      continue;
    }
    if (node.type === Algebra.Types.PATTERN) {
      result.push(node as unknown as AlgebraType.Pattern);
      continue;
    }
    const inp = (node as { input?: AlgebraType.Operation | AlgebraType.Operation[] }).input;
    if (Array.isArray(inp)) {
      for (const child of inp) {
        stack.push(child);
      }
    } else if (inp) {
      stack.push(inp);
    }
  }
  return result;
}

function termsCompatible(a: RDF.Term, b: RDF.Term): boolean {
  if (a.termType === 'Variable' || b.termType === 'Variable') {
    return true;
  }
  return a.equals(b);
}

function headCanMatchBodyPattern(head: AlgebraType.Pattern, body: AlgebraType.Pattern): boolean {
  return termsCompatible(head.subject, body.subject) &&
    termsCompatible(head.predicate, body.predicate) &&
    termsCompatible(head.object, body.object);
}

// ─── Head-template index for O(R × fan-in) dependency analysis ────────────────

function isVar(term: RDF.Term): boolean {
  return term.termType === 'Variable' || term.termType === 'BlankNode';
}

function addToIndex(map: Map<string, Set<number>>, key: string, idx: number): void {
  let s = map.get(key);
  if (!s) { s = new Set(); map.set(key, s); }
  s.add(idx);
}

interface HeadTemplateIndex {
  byS: Map<string, Set<number>>;
  byP: Map<string, Set<number>>;
  byO: Map<string, Set<number>>;
  varS: Set<number>;
  varP: Set<number>;
  varO: Set<number>;
}

function buildHeadTemplateIndex(
  rules: { template: AlgebraType.Pattern[] }[],
): HeadTemplateIndex {
  const byS = new Map<string, Set<number>>();
  const byP = new Map<string, Set<number>>();
  const byO = new Map<string, Set<number>>();
  const varS = new Set<number>();
  const varP = new Set<number>();
  const varO = new Set<number>();

  for (let i = 0; i < rules.length; i++) {
    for (const tpl of rules[i].template) {
      if (isVar(tpl.subject))   { varS.add(i); } else { addToIndex(byS, tpl.subject.value, i); }
      if (isVar(tpl.predicate)) { varP.add(i); } else { addToIndex(byP, tpl.predicate.value, i); }
      if (isVar(tpl.object))    { varO.add(i); } else { addToIndex(byO, tpl.object.value, i); }
    }
  }
  return { byS, byP, byO, varS, varP, varO };
}

const EMPTY_SET: ReadonlySet<number> = new Set();

function candidateRules(
  index: HeadTemplateIndex,
  bodyPat: AlgebraType.Pattern,
): ReadonlySet<number> | null {
  interface Bucket { size: number; exact: ReadonlySet<number>; flex: ReadonlySet<number> }
  const buckets: Bucket[] = [];

  if (!isVar(bodyPat.subject)) {
    const exact = index.byS.get(bodyPat.subject.value) ?? EMPTY_SET;
    buckets.push({ size: exact.size + index.varS.size, exact, flex: index.varS });
  }
  if (!isVar(bodyPat.predicate)) {
    const exact = index.byP.get(bodyPat.predicate.value) ?? EMPTY_SET;
    buckets.push({ size: exact.size + index.varP.size, exact, flex: index.varP });
  }
  if (!isVar(bodyPat.object)) {
    const exact = index.byO.get(bodyPat.object.value) ?? EMPTY_SET;
    buckets.push({ size: exact.size + index.varO.size, exact, flex: index.varO });
  }

  if (buckets.length === 0) {
    return null;
  }

  buckets.sort((a, b) => a.size - b.size);
  const { exact, flex } = buckets[0];

  if (flex.size === 0) return exact;
  if (exact.size === 0) return flex;

  const merged = new Set<number>(exact);
  for (const v of flex) merged.add(v);
  return merged;
}

function buildDependencyEdges(
  rules: { input: AlgebraType.Operation; template: AlgebraType.Pattern[] }[],
): DepEdge[] {
  const bodyPatterns = rules.map(r => extractBodyPatterns(r.input));
  const headIndex = buildHeadTemplateIndex(rules);
  const edges: DepEdge[] = [];

  for (let fromIdx = 0; fromIdx < rules.length; fromIdx++) {
    const addedTo = new Set<number>();

    for (const bodyPat of bodyPatterns[fromIdx]) {
      const candidates = candidateRules(headIndex, bodyPat);
      const toList: Iterable<number> = candidates === null
        ? Array.from({ length: rules.length }, (_, i) => i)
        : candidates;

      for (const toIdx of toList) {
        if (addedTo.has(toIdx)) continue;
        for (const headTpl of rules[toIdx].template) {
          if (headCanMatchBodyPattern(headTpl, bodyPat)) {
            edges.push({ from: fromIdx, to: toIdx });
            addedTo.add(toIdx);
            break;
          }
        }
      }
    }
  }
  return edges;
}

function computeSCCs(n: number, edges: DepEdge[]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  const radj: number[][] = Array.from({ length: n }, () => []);
  for (const { from, to } of edges) {
    adj[from].push(to);
    radj[to].push(from);
  }

  const visited = new Array<boolean>(n).fill(false);
  const order: number[] = [];
  for (let start = 0; start < n; start++) {
    if (visited[start]) {
      continue;
    }
    const stack: [number, number][] = [[ start, 0 ]];
    visited[start] = true;
    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      const v = frame[0];
      if (frame[1] < adj[v].length) {
        const w = adj[v][frame[1]++];
        if (!visited[w]) {
          visited[w] = true;
          stack.push([ w, 0 ]);
        }
      } else {
        order.push(v);
        stack.pop();
      }
    }
  }

  const assigned = new Array<boolean>(n).fill(false);
  const components: number[][] = [];
  for (let i = order.length - 1; i >= 0; i--) {
    const s = order[i];
    if (assigned[s]) {
      continue;
    }
    const comp: number[] = [];
    const stack: number[] = [ s ];
    assigned[s] = true;
    while (stack.length > 0) {
      const v = stack.pop()!;
      comp.push(v);
      for (const w of radj[v]) {
        if (!assigned[w]) {
          assigned[w] = true;
          stack.push(w);
        }
      }
    }
    components.push(comp.sort((a, b) => a - b));
  }
  return components;
}

function stratifyLayers(ruleCount: number, components: number[][], edges: DepEdge[]): number[][] {
  const componentOf = new Map<number, number>();
  components.forEach((comp, idx) => {
    for (const r of comp) {
      componentOf.set(r, idx);
    }
  });

  const nComp = components.length;
  const outgoing: Set<number>[] = Array.from({ length: nComp }, () => new Set());
  const indegree = new Array<number>(nComp).fill(0);

  for (const { from, to } of edges) {
    const dependent = componentOf.get(from)!;
    const dependency = componentOf.get(to)!;
    if (dependent === dependency) {
      continue;
    }
    if (!outgoing[dependency].has(dependent)) {
      outgoing[dependency].add(dependent);
      indegree[dependent]++;
    }
  }

  let ready: number[] = [];
  for (let i = 0; i < nComp; i++) {
    if (indegree[i] === 0) {
      ready.push(i);
    }
  }

  const layers: number[][] = [];
  const emitted = new Set<number>();

  while (ready.length > 0) {
    ready.sort((a, b) => components[a][0] - components[b][0]);
    const current = ready;
    ready = [];
    const layer: number[] = [];
    for (const compIdx of current) {
      emitted.add(compIdx);
      layer.push(...components[compIdx]);
      for (const next of outgoing[compIdx]) {
        if (--indegree[next] === 0) {
          ready.push(next);
        }
      }
    }
    layers.push(layer.sort((a, b) => a - b));
  }

  if (emitted.size !== nComp) {
    return [ Array.from({ length: ruleCount }, (_, i) => i) ];
  }
  return layers;
}

function computeRecursiveLayerFlags(layers: number[][], edges: DepEdge[]): boolean[] {
  const layerOf = new Map<number, number>();
  layers.forEach((layer, idx) => {
    for (const r of layer) {
      layerOf.set(r, idx);
    }
  });

  const flags = new Array<boolean>(layers.length).fill(false);
  for (const { from, to } of edges) {
    const fl = layerOf.get(from);
    if (fl !== undefined && fl === layerOf.get(to)) {
      flags[fl] = true;
    }
  }
  return flags;
}

/**
 * A Comunica query-operation actor that evaluates SHACL Rules documents via
 * forward-chaining inference.
 *
 * Pipeline: parse DATA → stratify rules (Kosaraju SCC + Kahn topological layering)
 * → execute layers (single-pass for acyclic, fixpoint loop for recursive)
 * → return the union of all inferred quads.
 */
export class ActorQueryOperationShaclRule extends ActorQueryOperationTypedMediated<AlgebraType.Operation> {
  public readonly mediatorUpdateQuads: MediatorRdfUpdateQuads;

  public constructor(args: IActorQueryOperationShaclRuleArgs) {
    super(args, 'shaclRule');
    this.mediatorUpdateQuads = args.mediatorUpdateQuads;
  }

  public async testOperation(_pattern: AlgebraType.Operation): Promise<TestResult<IActorTest>> {
    return passTestVoid();
  }

  /**
   * Execute a SHACL Rules document.
   *
   * 1. Insert any DATA-block quads into the active store.
   * 2. Analyse rule dependencies via head/body pattern matching.
   * 3. Compute strongly-connected components (Kosaraju's algorithm) and
   *    topological layering (Kahn's algorithm).
   * 4. Execute layers in order:
   *    - Non-recursive layers: single sequential pass (topological order).
   *    - Recursive layers: fixpoint loop until no new quads are produced.
   * 5. Return a union stream of all newly-inferred quads.
   *
   * @param patternOrig - The `shaclRule` algebra node.
   * @param context - The Comunica action context.
   * @returns A quad stream result containing all inferred quads.
   */
  public async runOperation(patternOrig: AlgebraType.Operation, context: IActionContext): Promise<IQueryOperationResult> {
    const doc = patternOrig as unknown as ShaclRulesDocument;

    const seenQuads = new Set<string>();
    for (const q of doc.data) {
      seenQuads.add(quadKey(q));
    }

    if (doc.data.length > 0) {
      const { execute } = await this.mediatorUpdateQuads.mediate({
        quadStreamInsert: new ArrayIterator<RDF.Quad>(doc.data, { autoStart: false }),
        context,
      });
      await execute();
    }

    if (doc.rules.length === 0) {
      return {
        type: 'quads',
        quadStream: new ArrayIterator<RDF.Quad>(doc.data, { autoStart: false }),
        metadata: async() => ({ cardinality: { type: 'estimate', value: doc.data.length }}) as any,
      };
    }

    const edges = buildDependencyEdges(doc.rules);
    const components = computeSCCs(doc.rules.length, edges);
    const layers = stratifyLayers(doc.rules.length, components, edges);
    const recursiveFlags = computeRecursiveLayerFlags(layers, edges);

    const allNewQuads: RDF.Quad[] = [ ...doc.data ];
    let totalCardinality = doc.data.length;

    for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
      const layer = layers[layerIdx];
      const isRecursive = recursiveFlags[layerIdx];

      if (!isRecursive) {
        for (const ruleIdx of layer) {
          const { newQuads } = await this.applyRule(doc.rules[ruleIdx], context, seenQuads);
          if (newQuads.length > 0) {
            totalCardinality += newQuads.length;
            for (const q of newQuads) { allNewQuads.push(q); }
            await this.insertQuads(newQuads, context);
          }
        }
      } else {
        let moreWork = true;
        while (moreWork) {
          moreWork = false;
          for (const ruleIdx of layer) {
            const { newQuads } = await this.applyRule(doc.rules[ruleIdx], context, seenQuads);
            if (newQuads.length > 0) {
              moreWork = true;
              totalCardinality += newQuads.length;
              for (const q of newQuads) { allNewQuads.push(q); }
              await this.insertQuads(newQuads, context);
            }
          }
        }
      }
    }

    const quadStream = new ArrayIterator<RDF.Quad>(allNewQuads, { autoStart: false });
    return {
      type: 'quads',
      quadStream,
      metadata: async() => ({ cardinality: { type: 'estimate', value: totalCardinality }} as any),
    };
  }

  /**
   * Execute a single CONSTRUCT rule and return quads not yet seen.
   *
   * @param rule - A rule with an algebra body (`input`) and CONSTRUCT head templates (`template`).
   * @param context - The Comunica action context.
   * @param seenQuads - A global deduplication set shared across all rules and iterations.
   * @returns The newly-inferred quads (not previously seen).
   */
  private async applyRule(
    rule: { input: AlgebraType.Operation; template: AlgebraType.Pattern[] },
    context: IActionContext,
    seenQuads: Set<string>,
  ): Promise<{ newQuads: RDF.Quad[] }> {
    const constructOp: AlgebraType.Construct = {
      type: Algebra.Types.CONSTRUCT,
      input: rule.input,
      template: rule.template,
    };

    const output = getSafeQuads(await this.mediatorQueryOperation.mediate({
      operation: constructOp,
      context,
    }));

    const newQuads: RDF.Quad[] = [];

    await new Promise<void>((resolve, reject) => {
      output.quadStream.on('data', (quad: RDF.Quad) => {
        const key = quadKey(quad);
        if (!seenQuads.has(key)) {
          seenQuads.add(key);
          newQuads.push(quad);
        }
      });
      output.quadStream.on('error', reject);
      output.quadStream.on('end', resolve);
    });

    return { newQuads };
  }

  /**
   * Insert a batch of quads into the active RDF store.
   *
   * @param quads - The quads to insert.
   * @param context - The Comunica action context.
   */
  private async insertQuads(quads: RDF.Quad[], context: IActionContext): Promise<void> {
    const { execute } = await this.mediatorUpdateQuads.mediate({
      quadStreamInsert: new ArrayIterator<RDF.Quad>(quads, { autoStart: false }),
      context,
    });
    await execute();
  }
}

export interface IActorQueryOperationShaclRuleArgs extends IActorQueryOperationTypedMediatedArgs {
  mediatorUpdateQuads: MediatorRdfUpdateQuads;
}

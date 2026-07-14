/**
 * Web Worker — runs the SHACL Rules engine off the main thread.
 * In:  { shaclQuery, turtleData }
 * Out: { type: 'result', count, ms } | { type: 'error', error }
 */
try {
  importScripts('engine-browser.js', 'rdf-stores-browser.js');
} catch(e) {
  self.postMessage({ type: 'error', error: 'Failed to load engine bundles' });
}

self.onmessage = async (e) => {
  const { shaclQuery, turtleData } = e.data;
  try {
    const QC = self.ComunicaShacl;
    const RS = self.RdfStores;
    if (!QC || !QC.QueryEngine) throw new Error('Engine not loaded');
    if (!RS || !RS.createDefault) throw new Error('Store not loaded');

    const engine = new QC.QueryEngine();
    const store = RS.createDefault();

    const t0 = performance.now();
    const stream = await engine.queryQuads(shaclQuery, {
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

    self.postMessage({ type: 'result', count, ms: Math.round(performance.now() - t0) });
  } catch(err) {
    self.postMessage({ type: 'error', error: err.message || String(err) });
  }
};

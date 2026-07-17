import './engine.js';
import { createApp, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

const DEFAULT_SHACL =
`PREFIX : <http://example/>

DATA {
  :alice :parent :bob .
  :bob   :parent :carol .
}

RULE { ?grandParent :ancestor ?grandChild . }
WHERE {
  ?grandParent :parent ?mid .
  ?mid         :parent ?grandChild .
}`;

createApp({
  setup() {
    const shaclQuery  = ref(DEFAULT_SHACL);
    const turtleData  = ref('');
    const running     = ref(false);
    const rows        = ref([]);
    const neverRan    = ref(true);
    const statusText  = ref('Ready');
    const statusClass = ref('');
    const scroll      = ref(null);
    const fileInput   = ref(null);
    const modal       = ref(null); // 'grammar' | 'how' | null
    const execTime    = ref(null); // ms, set after run
    const provenance  = ref(null); // { triple, loading, results }

    // --- Tabs ---
    const activeTab = ref('editor');

    // --- Examples dashboard ---
    const exampleResults = ref([]);
    const exampleRunning = ref(false);
    const exampleResultsHeight = ref(500);
    const exampleRegistry = ref([]);

    const exampleStats = computed(() => {
      const results = exampleResults.value;
      return {
        total: results.length,
        passed: results.filter(e => e.status === 'pass').length,
        failed: results.filter(e => e.status === 'fail').length,
        errors: results.filter(e => e.status === 'error').length,
        skipped: results.filter(e => e.status === 'skipped').length,
      };
    });

    const exampleStatusClass = computed(() => {
      const s = exampleStats.value;
      if (exampleRunning.value) return 'running';
      if (s.errors > 0) return 'error';
      if (s.failed > 0) return 'error';
      return s.passed > 0 ? 'done' : '';
    });

    const exampleStatusText = computed(() => {
      const s = exampleStats.value;
      if (exampleRunning.value) {
        const current = exampleResults.value.find(e => e.status === 'running');
        return 'Running: ' + (current ? current.name : '...');
      }
      const parts = [];
      if (s.passed > 0) parts.push(s.passed + ' passed');
      if (s.failed > 0) parts.push(s.failed + ' failed');
      if (s.errors > 0) parts.push(s.errors + ' errors');
      if (s.skipped > 0) parts.push(s.skipped + ' skipped');
      return parts.join(', ') || 'No results';
    });

    async function loadExamplesDashboard() {
      if (exampleRegistry.value.length > 0) return;
      try {
        const [reg, prerun] = await Promise.all([
          fetch('examples/index.json').then(r => r.json()),
          fetch('examples/results.json').then(r => r.json()).catch(() => []),
        ]);
        const prerunMap = {};
        for (const p of prerun) prerunMap[p.file] = p;
        exampleRegistry.value = reg;
        exampleResults.value = reg.map(ex => {
          const pr = prerunMap[ex.file];
          if (ex.expectedError) return { ...ex, status: 'skipped', count: -1, ms: -1, error: null };
          if (pr && pr.error) return { ...ex, status: 'error', count: -1, ms: pr.ms || -1, error: pr.error };
          if (pr && !pr.error) {
            const match = ex.goldenCount >= 0 ? pr.count === ex.goldenCount : null;
            return { ...ex, status: match === true ? 'pass' : (match === false ? 'fail' : 'idle'), count: pr.count, ms: pr.ms || -1, error: null };
          }
          return { ...ex, status: 'idle', count: -1, ms: -1, error: null };
        });
      } catch (e) { console.error('Failed to load examples:', e); }
    }

    async function openExampleInEditor(ex) {
      try {
        const resp = await fetch(`examples/${ex.file}`);
        if (!resp.ok) return;
        const src = await resp.text();
        shaclQuery.value = src;
        turtleData.value = '';
        clearResults();
        activeTab.value = 'editor';
      } catch (e) { /* ignore */ }
    }

    async function runExample(ex) {
      const idx = exampleResults.value.indexOf(ex);
      if (idx === -1) return;
      ex.status = 'running';
      exampleResults.value[idx] = { ...ex };
      exampleResults.value = [...exampleResults.value]; // trigger once
      const t0 = performance.now();
      try {
        const resp = await fetch(`examples/${ex.file}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const src = await resp.text();
        const { count, ms: workerMs } = await window.ShaclEngine.runInWorker({ shaclQuery: src, turtleData: '' });
        const ms = workerMs || Math.round(performance.now() - t0);
        const goldenMatch = ex.goldenCount >= 0 ? count === ex.goldenCount : null;
        ex.status = ex.expectedError ? 'pass' : (goldenMatch === true ? 'pass' : 'fail');
        ex.count = count;
        ex.ms = ms;
        ex.error = null;
      } catch (e) {
        ex.status = ex.expectedError ? 'pass' : 'error';
        ex.count = -1;
        ex.ms = Math.round(performance.now() - t0);
        ex.error = e.message;
      }
      exampleResults.value[idx] = { ...ex };
    }

    async function runAllExamples() {
      exampleRunning.value = true;
      await nextTick();  // let DOM paint before blocking
      await new Promise(r => setTimeout(r, 100));
      for (const ex of exampleResults.value) {
        await runExample(ex);
        await new Promise(r => setTimeout(r, 50));
      }
      exampleRunning.value = false;
    }
    const editorHeight  = ref(420);
    const resultsHeight = ref(260);
    const draggingEditor  = ref(false);
    const draggingResults = ref(false);

    function startResizeEditor(e) {
      draggingEditor.value = true;
      const startY = e.clientY, startH = editorHeight.value;
      const onMove = ev => { editorHeight.value = Math.max(120, startH + (ev.clientY - startY)); };
      const onUp   = () => { draggingEditor.value = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    function startResizeResults(e) {
      draggingResults.value = true;
      const startY = e.clientY, startH = resultsHeight.value;
      const onMove = ev => { resultsHeight.value = Math.max(80, startH + (ev.clientY - startY)); };
      const onUp   = () => { draggingResults.value = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    // --- W3C Conformance Dashboard ---
    const shaclConfResults = ref([]);
    const shaclConfStats = computed(() => {
      const r = shaclConfResults.value;
      return { total: r.length, passed: r.filter(t => t.status === 'pass').length, failed: r.filter(t => t.status === 'fail').length, skipped: r.filter(t => t.status === 'skipped').length };
    });
    const shaclConfStatusClass = computed(() => (shaclConfStats.value.failed > 0 ? 'error' : shaclConfStats.value.passed > 0 ? 'done' : ''));
    const shaclConfStatusText = computed(() => {
      const s = shaclConfStats.value;
      return s.total > 0 ? s.passed + '/' + s.total + ' passed' + (s.failed > 0 ? ', ' + s.failed + ' failed' : '') + (s.skipped > 0 ? ', ' + s.skipped + ' skipped' : '') : '';
    });
    async function loadShaclConformance() {
      if (shaclConfResults.value.length > 0) return;
      try { shaclConfResults.value = await (await fetch('shacl-conformance.json')).json(); } catch(e) { /* ignore */ }
    }
    async function openConfTest(t) {
      try {
        const resp = await fetch(`w3c-tests/${t.cat}/${t.file}`);
        if (!resp.ok) return;
        shaclQuery.value = await resp.text();
        turtleData.value = '';
        clearResults();
        activeTab.value = 'editor';
      } catch(e) { /* ignore */ }
    }

    // --- Examples dropdown ---
    const examples     = ref([]);
    const showExamples = ref(false);
    const examplesBtn  = ref(null);

    // --- URL state ---
    function switchTab(tab) {
      activeTab.value = tab;
      const routes = { editor: '/editor', examples: '/examples-tests', conformance: '/shacl-conformance-tests' };
      const newHash = '#' + routes[tab];
      if (location.hash !== newHash) history.pushState(null, null, newHash);
      if (tab === 'examples') loadExamplesDashboard();
      if (tab === 'conformance') loadShaclConformance();
    }

    function loadStateFromUrl() {
      const hash = location.hash;
      // Tab routing
      if (hash === '#/examples-tests') activeTab.value = 'examples';
      else if (hash === '#/shacl-conformance-tests') activeTab.value = 'conformance';
      else activeTab.value = 'editor';

      // Legacy query/data state
      let legacyState = hash.startsWith('#query=') || hash.startsWith('#data=');
      if (!legacyState && !hash.startsWith('#/')) {
        // old-style: /# query=...   data=... without route prefix
      }
      const state = hash.slice(1).split('&').reduce((acc, item) => {
        const kv = item.match(/^([^=]+)=(.*)/);
        if (kv) acc[decodeURIComponent(kv[1])] = decodeURIComponent(kv[2]);
        return acc;
      }, {});
      if (state.query !== undefined) shaclQuery.value = state.query;
      if (state.data !== undefined) turtleData.value = state.data;
    }

    function saveStateToUrl() {
      if (activeTab.value !== 'editor') return; // only save editor state on editor tab
      const routes = { editor: '/editor', examples: '/examples-tests', conformance: '/shacl-conformance-tests' };
      let hash = '#' + routes[activeTab.value];
      const parts = [];
      const encodedQuery = encodeURIComponent(shaclQuery.value).replace(/\(/g, '%28').replace(/\)/g, '%29');
      parts.push('query=' + encodedQuery);
      if (turtleData.value) {
        const encodedData = encodeURIComponent(turtleData.value).replace(/\(/g, '%28').replace(/\)/g, '%29');
        parts.push('data=' + encodedData);
      }
      hash += '&' + parts.join('&');
      history.replaceState(null, null, hash);
    }

    onMounted(async () => {
      loadStateFromUrl();
      window.addEventListener('popstate', loadStateFromUrl);

      if (activeTab.value === 'examples') loadExamplesDashboard();
      if (activeTab.value === 'conformance') loadShaclConformance();

      try {
        const res = await fetch('./examples/index.json');
        examples.value = await res.json();
      } catch (e) {
        console.warn('Could not load examples index:', e);
      }
      document.addEventListener('click', handleOutsideClick);

      // Save state whenever editors change
      watch([shaclQuery, turtleData], saveStateToUrl, { flush: 'post' });
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('popstate', loadStateFromUrl);
    });

    function handleOutsideClick(e) {
      if (examplesBtn.value && !examplesBtn.value.contains(e.target)) {
        showExamples.value = false;
      }
    }

    function toggleExamples() { showExamples.value = !showExamples.value; }

    async function loadExample(ex) {
      showExamples.value = false;
      try {
        const res = await fetch(`./examples/${ex.file}`);
        const text = await res.text();
        shaclQuery.value = text.trim();
        turtleData.value = '';
        rows.value = [];
        neverRan.value = true;
        statusText.value = `Loaded: ${ex.name}`;
        statusClass.value = '';
      } catch (e) {
        statusText.value = 'Failed to load example.';
        statusClass.value = 'error';
      }
    }

    function showModal(which) { modal.value = which; }

    // --- DATA block sync ---
    function syncDataBlock(turtle) {
      const allLines = turtle.trim().split('\n');

      const prefixLines = allLines.filter(l => /^\s*(PREFIX|@prefix)\s/i.test(l));
      const tripleLines = allLines.filter(l => l.trim() && !/^\s*(PREFIX|@prefix)\s/i.test(l) && !l.trim().startsWith('#'));

      for (const prefixLine of prefixLines) {
        const match = prefixLine.match(/PREFIX\s+(\S+)\s+/i);
        if (match && !shaclQuery.value.includes(match[1])) {
          shaclQuery.value = prefixLine.trim() + '\n' + shaclQuery.value;
        }
      }

      const inner = tripleLines.length
        ? '\n  ' + tripleLines.join('\n  ') + '\n'
        : '\n';
      const dataBlock = `DATA {${inner}}`;

      if (/DATA\s*\{[\s\S]*?\}/.test(shaclQuery.value)) {
        shaclQuery.value = shaclQuery.value.replace(/DATA\s*\{[\s\S]*?\}/, dataBlock);
      } else {
        const queryLines = shaclQuery.value.split('\n');
        let insertAt = 0;
        for (let i = 0; i < queryLines.length; i++) {
          if (queryLines[i].trim().toUpperCase().startsWith('PREFIX')) insertAt = i + 1;
        }
        queryLines.splice(insertAt, 0, '', dataBlock);
        shaclQuery.value = queryLines.join('\n');
      }
    }

    watch(turtleData, (val) => syncDataBlock(val));

    // --- File upload ---
    function triggerFileUpload() { fileInput.value.click(); }

    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        turtleData.value = e.target.result;
        event.target.value = '';
      };
      reader.readAsText(file);
    }

    const goodRows = computed(() => rows.value.filter(r => !r.error).length);

    function esc(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function fmt(val) {
      if (!val) return '<em style="color:#475569">default graph</em>';
      if (/^(https?:|urn:)/.test(val))
        return `<span class="uri">&lt;${esc(val)}&gt;</span>`;
      return `<span class="literal">${esc(val)}</span>`;
    }

    function clearResults() {
      rows.value = [];
      neverRan.value = true;
      statusText.value = 'Ready';
      statusClass.value = '';
      execTime.value = null;
      provenance.value = null;
    }

    function downloadTurtle() {
      const good = rows.value.filter(r => !r.error);
      if (!good.length) return;

      // Collect prefix declarations from the SHACL query
      const prefixLines = shaclQuery.value
        .split('\n')
        .filter(l => /^\s*PREFIX\s+/i.test(l))
        .map(l => l.trim());

      // Build a prefix map for compacting IRIs
      const prefixMap = {};
      for (const line of prefixLines) {
        const m = line.match(/PREFIX\s+(\S+)\s*<([^>]+)>/i);
        if (m) prefixMap[m[1]] = m[2];  // e.g. {"ex:": "http://example/"}
      }

      function compact(iri) {
        if (!iri) return '[]'; // blank/default graph — skip
        for (const [prefix, base] of Object.entries(prefixMap)) {
          if (iri.startsWith(base)) return prefix + iri.slice(base.length);
        }
        return `<${iri}>`;
      }

      function termToTurtle(val) {
        if (!val) return null;
        if (/^(https?:|urn:|[a-z][a-z0-9+\-.]*:\/\/)/.test(val)) return compact(val);
        // literal — wrap in quotes; detect datatype suffix
        if (val.includes('^^')) {
          const [lit, dt] = val.split('^^');
          return `"${lit}"^^${compact(dt)}`;
        }
        return `"${val.replace(/"/g, '\\"')}"`;
      }

      const tripleLines = good.map(r => {
        const s = termToTurtle(r.subject);
        const p = termToTurtle(r.predicate);
        const o = termToTurtle(r.object);
        if (!s || !p || !o) return null;
        return `${s} ${p} ${o} .`;
      }).filter(Boolean);

      const ttl = [
        '# Inferred triples exported from SHACL Rules Inference UI',
        '',
        ...prefixLines,
        prefixLines.length ? '' : null,
        ...tripleLines,
      ].filter(l => l !== null).join('\n') + '\n';

      const blob = new Blob([ttl], { type: 'text/turtle' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = 'inferred.ttl';
      a.click();
      URL.revokeObjectURL(url);
    }

    async function clickRow(row) {
      if (row.error) return;
      provenance.value = { triple: row, loading: true, results: [] };
      try {
        const results = await window.ShaclEngine.explainTriple(shaclQuery.value.trim(), row);
        provenance.value = { triple: row, loading: false, results };
      } catch (e) {
        provenance.value = { triple: row, loading: false, results: [], error: e.message };
      }
    }

    async function runQuery() {
      if (!shaclQuery.value.trim()) {
        statusText.value = 'Please enter a SHACL query.';
        statusClass.value = 'error';
        return;
      }

      running.value = true;
      rows.value = [];
      neverRan.value = false;
      execTime.value = null;
      provenance.value = null;
      statusText.value = 'Running…';
      statusClass.value = 'running';
      await nextTick();  // let DOM paint before engine blocks
      const t0 = performance.now();
      const MAX_DISPLAY = 2000;
      let totalCount = 0;

      try {
        await window.ShaclEngine.runShaclQuery(
          { shaclQuery: shaclQuery.value.trim(), turtleData: turtleData.value },
          (quad) => {
            totalCount++;
            if (rows.value.length < MAX_DISPLAY) {
              rows.value.push(quad);
            }
          }
        );

        await nextTick();

        const errCount = rows.value.filter(r => r.error).length;
        const good = totalCount - errCount;
        execTime.value = Math.round(performance.now() - t0);
        if (errCount > 0) {
          statusText.value = `Done with errors — ${good} triple${good !== 1 ? 's' : ''} inferred`;
          statusClass.value = 'error';
        } else if (totalCount > MAX_DISPLAY) {
          statusText.value = `Done — ${good} triples inferred (showing first ${MAX_DISPLAY})`;
          statusClass.value = 'done';
        } else {
          statusText.value = `Done — ${good} triple${good !== 1 ? 's' : ''} inferred`;
          statusClass.value = 'done';
        }
      } catch (err) {
        statusText.value = 'Inference failed: ' + err.message;
        statusClass.value = 'error';
        console.error(err);
      } finally {
        running.value = false;
      }
    }

    return {
      shaclQuery, turtleData, running, rows, neverRan, goodRows,
      statusText, statusClass, scroll, fileInput, modal,
      execTime, provenance,
      editorHeight, resultsHeight, draggingEditor, draggingResults,
      startResizeEditor, startResizeResults,
      examples, showExamples, examplesBtn,
      fmt, clearResults, runQuery, triggerFileUpload, handleFileUpload,
      showModal, toggleExamples, loadExample, clickRow, downloadTurtle,
      activeTab, exampleResults, exampleRunning, exampleResultsHeight,
      exampleStatusClass, exampleStatusText, exampleStats,
      loadExamplesDashboard, runAllExamples, runExample, openExampleInEditor,
      loadShaclConformance, shaclConfResults, shaclConfStats, shaclConfStatusClass, shaclConfStatusText, openConfTest,
      switchTab,
    };
  },
}).mount('#app');



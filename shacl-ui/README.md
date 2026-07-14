# SHACL UI

Interactive web interface for writing and executing SHACL Rules. Runs entirely in the browser — no server needed. Can be hosted on GitHub Pages.

## Build

```bash
# From the repo root:
cd comunica-feature-shacl-rules

# 1. Build the Comunica SHACL engine as a browser bundle
npx webpack --config shacl-ui/webpack.engine.config.cjs

# 2. Build the Vue 3 UI
cd shacl-ui && npx vite build

# 3. Serve (or deploy public/ to any static host)
npx http-server public -p 3000 -c-1
```

Open `http://localhost:3000`.

## Architecture

```
public/engine-browser.js     — Pre-built Comunica engine (Webpack UMD, 2.2 MiB)
public/app.bundle.js         — Vue 3 application (Vite, 542 KiB)
public/index.html            — Loads engine → then app
src/engine.js                — Wraps window.ComunicaShacl.QueryEngine
src/app.js                   — Vue 3 UI (unchanged from original)
```

The engine bundle exposes `window.ComunicaShacl.QueryEngine`. The UI creates a fresh `QueryEngine` for each run, loading SHACL rules and Turtle data into an in-memory `rdf-stores` store, then calling `queryQuads()` with fixpoint semantics (`sources` and `destination` both pointing to the same store).

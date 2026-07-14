import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/app.js'),
      name: 'ShaclApp',
      fileName: () => 'app.bundle.js',
      formats: ['es'],
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  resolve: {
    alias: { vue: 'vue/dist/vue.esm-bundler.js' },
  },
});

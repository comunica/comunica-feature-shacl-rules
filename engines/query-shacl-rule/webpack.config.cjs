const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'lib/index-browser.js'),
  context: __dirname,
  output: {
    path: __dirname,
    filename: 'engine-browser.js',
    library: { name: 'ComunicaShacl', type: 'umd' },
  },
  target: 'web',
  mode: 'production',
  resolve: {
    fallback: {
      'fs': false, 'path': false, 'os': false, 'crypto': false, 'module': false,
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer'),
      'process': require.resolve('process/browser'),
      'url': require.resolve('url'),
      'events': require.resolve('events'),
      'diagnostics_channel': false,
    },
  },
  ignoreWarnings: [/Critical dependency/],
};

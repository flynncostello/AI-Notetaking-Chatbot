// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add your Webpack configuration here

  // Resolve issues with 'zlib', 'querystring', 'assert', 'buffer', 'stream', 'path', and 'crypto'
  config.resolve.fallback = {
    "zlib": require.resolve("browserify-zlib"),
    "querystring": require.resolve("querystring-es3"),
    "assert": require.resolve("assert/"),
    "process": require.resolve("process/browser"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "path": require.resolve("path-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "fs": require.resolve("browserify-fs"),
    "http": require.resolve("stream-http"),
    "url": require.resolve("url/"),
    "async_hooks": require.resolve("async_hooks")
  };

  return config;
};
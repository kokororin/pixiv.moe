'use strict';

let path = require('path');
let webpack = require('webpack');
let fs = require('fs');
let minify = require('html-minifier').minify;

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'babel-polyfill',
    'es6-promise',
    'whatwg-fetch',
    path.join(__dirname, '../src/index')
  ],
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'bundle.js',
    publicPath: defaultSettings.publicPath
  },
  cache: false,
  devtool: 'cheap-module-inline-source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(), function() {
      this.plugin('done', function(statsData) {
        let stats = statsData.toJson();
        if (!stats.errors.length) {
          let htmlFileName = '/../dist/index.html';
          let htmlFilePath = path.join(__dirname, htmlFileName);
          let html = fs.readFileSync(htmlFilePath, 'utf8');

          // let htmlOutput = html.replace(
          //   /<script\s+src=(["'])(.+?)bundle\.js\1/i,
          //   '<script src=$1$2' + stats.assetsByChunkName.main + '?' + stats.hash + '$1');

          let htmlOutput = html.replace(
            /<script\s+src=(["'])(.+?)bundle\.js(.*)<\/script>/i,
            `<script type="text/javascript">
(function(hash, src, localStorage, document, window) {
  var createScript = function(url) {
    var script = document.createElement("script");
    script.setAttribute("src", url);
    document.body.appendChild(script);
  };

  var runScript = function(content) {
    setTimeout(function() {
      window.eval(content);
    }, 1);
  };

  if (localStorage) {
    if (localStorage.bundle && localStorage.hash == hash) {
      runScript(localStorage.bundle);
    } else {
      var xhr = new XMLHttpRequest;
      xhr.open("GET", src, true);
      xhr.onload = function() {
        var res = xhr.responseText;
        if (res && res.match(/^!function/)) {
          localStorage.bundle = res;
          runScript(localStorage.bundle);
          localStorage.hash = hash;
        } else {
          createScript(src);
        }
      };
      xhr.send();
    }
  } else {
    createScript(src);
  }
})("${stats.hash}", "$2${stats.assetsByChunkName.main}?${stats.hash}", window.localStorage, document, window);
</script>`);

          htmlOutput = minify(htmlOutput, {
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            processConditionalComments: true
          });

          fs.writeFileSync(htmlFilePath, htmlOutput);
        }
      });
    }
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;

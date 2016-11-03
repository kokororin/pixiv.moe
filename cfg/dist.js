'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let KotoriWebpackPlugin = require('kotori-webpack-plugin');

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
    new webpack.NoErrorsPlugin(),
    new KotoriWebpackPlugin({
      htmlFilePath: path.join(__dirname, '/../dist/index.html')
    })
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

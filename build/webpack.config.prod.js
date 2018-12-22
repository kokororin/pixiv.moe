/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, '../src/index')],
  cache: false,
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/../src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: true,
      hash: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: false,
        minifyJS: true,
        minifyCSS: true,
        processConditionalComments: true
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'pixiv-moe-app',
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, '/../dist/report.html'),
      openAnalyzer: false,
      generateStatsFile: false
    }),
    function() {
      // eslint-disable-next-line
      this.plugin('done', function() {
        const htmlFileName = '/../dist/index.html';
        const htmlFilePath = path.join(__dirname, htmlFileName);
        fs.writeFileSync(
          htmlFilePath.replace('index', '404'),
          fs.readFileSync(htmlFilePath).toString()
        );
      });
    }
  ]
};

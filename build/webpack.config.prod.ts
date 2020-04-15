/* eslint prefer-arrow-callback: 0 */
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
import ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const config: webpack.Configuration = {
  mode: 'production',
  entry: ['@babel/polyfill', 'url-search-params-polyfill', './src/index.tsx'],
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
    function () {
      // eslint-disable-next-line
      this.plugin('done', function () {
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

export default config;

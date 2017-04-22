const path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, '/../src');

module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '/../src')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      include: path.join(__dirname, '/../src'),
      loader: 'eslint-loader'
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.scss/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)(\?|\?[a-z0-9]+)?$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      loader: 'imports-loader?define=>false&this=>window'
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, '../src/index')
  ],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'post',
        exclude: /node_modules|test/,
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat([
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ])
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/../src')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      autobind: 'autobind-decorator'
    })
  ],
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  node: {
    fs: 'empty'
  }
};

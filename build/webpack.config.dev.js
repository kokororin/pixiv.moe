const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    port: 23333,
    host: '0.0.0.0',
    publicPath: '/',
    noInfo: false,
    hot: true,
    stats: {
      colors: true
    }
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'whatwg-fetch',
    'classlist-polyfill',
    './src/index'
  ],
  cache: true,
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        include: path.join(__dirname, '/../src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: 'body',
      minify: false
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:23333' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

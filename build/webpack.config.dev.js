const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    port: 23333,
    publicPath: '/assets/',
    noInfo: false,
    stats: {
      colors: true
    }
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://127.0.0.1:23333',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    './src/index'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:23333' }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

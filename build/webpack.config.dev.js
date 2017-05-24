const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    port: 23333,
    host: '0.0.0.0',
    publicPath: '/assets/',
    noInfo: false,
    hot: true,
    stats: {
      colors: true
    }
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'whatwg-fetch',
    './src/index'
  ],
  cache: true,
  devtool: 'eval',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['react-hot-loader/webpack', 'babel-loader'],
      include: path.join(__dirname, '/../src')
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:23333' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

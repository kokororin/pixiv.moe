import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import OpenBrowserPlugin = require('open-browser-webpack-plugin');
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const config: webpack.Configuration = {
  mode: 'development',
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
    },
    quiet: true
  },
  entry: [
    '@babel/polyfill',
    'url-search-params-polyfill',
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  cache: true,
  devtool: '#eval-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: 'body',
      minify: false
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:23333' }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
};

export default config;

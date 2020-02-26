import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, '../src/index.tsx')],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        enforce: 'post',
        exclude: /node_modules|test/,
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'null-loader'
      }
    ]
  },
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  node: {
    fs: 'empty'
  }
});

export default config;

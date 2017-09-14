const path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, '/../src');

module.exports = {
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '/../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: path.join(__dirname, '/../src'),
        loader: 'eslint-loader'
      },
      {
        test: /(\.scss|\.css)$/,
        exclude: /node_modules|material-design-lite\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[hash:base64:8]',
              minimize: process.env.NODE_ENV === 'production'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /(\.scss|\.css)$/,
        include: /node_modules|material-design-lite\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: process.env.NODE_ENV === 'production'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)(\?|\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      autobind: 'autobind-decorator'
    })
  ]
};

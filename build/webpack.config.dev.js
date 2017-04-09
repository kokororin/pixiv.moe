const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

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
        },
        quiet: true
    },
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://127.0.0.1:23333',
        'webpack/hot/only-dev-server',
        'es6-promise',
        'whatwg-fetch',
        './src/index'
    ],
    cache: true,
    devtool: 'eval',
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '/../src'),
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'react-hot!babel-loader',
            include: [].concat([path.join(__dirname, '/../src')])
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.NoErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:23333' })
    ]
};

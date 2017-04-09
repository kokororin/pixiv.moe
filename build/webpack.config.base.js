const path = require('path');
const webpack = require('webpack');
const BowerWebpackPlugin = require('bower-webpack-plugin');

const srcPath = path.join(__dirname, '/../src');

module.exports = {
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            actions: `${srcPath}/actions/`,
            components: `${srcPath}/components/`,
            containers: `${srcPath}/containers/`,
            reducers: `${srcPath}/reducers/`,
            sources: `${srcPath}/sources/`,
            stores: `${srcPath}/stores/`,
            styles: `${srcPath}/styles/`,
            config: `${srcPath}/config/base`,
            'react/lib/ReactMount': 'react-dom/lib/ReactMount'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader?outputStyle=expanded'
        }, {
            test: /\.sass/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)(\?|\?[a-z0-9]+)?$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(mp4|ogg)$/,
            loader: 'file-loader'
        }, {
            test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
            loader: 'imports?define=>false&this=>window'
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        })
    ]
};

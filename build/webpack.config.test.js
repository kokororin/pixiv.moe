const path = require('path');

const srcPath = path.join(__dirname, '/../src');

module.exports = {
    devtool: 'eval',
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'isparta-instrumenter-loader',
            include: [
                path.join(__dirname, '/../src')
            ]
        }],
        loaders: [{
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
            actions: `${srcPath}/actions/`,
            components: `${srcPath}/components/`,
            containers: `${srcPath}/containers/`,
            reducers: `${srcPath}/reducers/`,
            sources: `${srcPath}/sources/`,
            stores: `${srcPath}/stores/`,
            styles: `${srcPath}/styles/`,
            config: `${srcPath}/config/base`,
            helpers: path.join(__dirname, '/../test/helpers'),
        }
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
};

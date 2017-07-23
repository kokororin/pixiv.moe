const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const minify = require('html-minifier').minify;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, '../src/index')
  ],
  cache: false,
  devtool: '#source-map',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, '/../dist/report.html'),
      openAnalyzer: false,
      generateStatsFile: false
    }),
    function() {
      this.plugin('done', function(statsData) {
        let stats = statsData.toJson();
        if (!stats.errors.length) {
          let htmlFileName = '/../dist/index.html';
          let htmlFilePath = path.join(__dirname, htmlFileName);
          let html = fs.readFileSync(htmlFilePath, 'utf8');

          // let htmlOutput = html.replace(
          //   /<script\s+src=(["'])(.+?)bundle\.js\1/i,
          //   '<script src=$1$2' + stats.assetsByChunkName.main + '?' + stats.hash + '$1');

          let htmlOutput = html.replace(
            /<script\s+src=(["'])(.+?)bundle\.js(.*)<\/script>/i,
            `<script type="text/javascript">
(function(hash, src, localStorage, document, window) {
  var createScript = function(url) {
    var script = document.createElement("script");
    script.setAttribute("src", url);
    document.body.appendChild(script);
  };

  var runScript = function(code) {
    if (window.execScript) {
      window.execScript(code);
    } else {
      var head = document.head;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = code;
      head.removeChild(head.appendChild(script));
    }
  };

  if (localStorage) {
    if (localStorage.bundle && localStorage.hash == hash) {
      runScript(localStorage.bundle);
    } else {
      var xhr = new XMLHttpRequest;
      xhr.open("GET", src, true);
      xhr.onload = function() {
        var res = xhr.responseText;
        if (res && res.match(/^!/)) {
          localStorage.bundle = res;
          runScript(localStorage.bundle);
          localStorage.hash = hash;
        } else {
          createScript(src);
        }
      };
      xhr.send();
    }
  } else {
    createScript(src);
  }
})("${stats.hash}", "$2${stats.assetsByChunkName
              .main}?${stats.hash}", window.localStorage, document, window);
</script>`
          );

          htmlOutput = minify(htmlOutput, {
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            processConditionalComments: true
          });

          fs.writeFileSync(htmlFilePath, htmlOutput);
          fs.writeFileSync(
            htmlFilePath.replace('index.html', '404.html'),
            htmlOutput
          );
          fs.writeFileSync(
            htmlFilePath.replace('index.html', '.gitignore'),
            'report.html'
          );
        }
      });
    }
  ]
};

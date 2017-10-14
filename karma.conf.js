const path = require('path');
const webpackCfg = require('./build/webpack.config.test');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  const configuration = {
    basePath: '',
    browsers: ['ChromeHeadless'],
    files: ['test/loadtests.js'],
    port: 3003,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage-istanbul'],
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      dir: path.join(__dirname, 'coverage'),
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      }
    }
  };

  config.set(configuration);
};

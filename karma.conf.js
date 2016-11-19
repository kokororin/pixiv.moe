var webpackCfg = require('./webpack.config');

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  var configuration = {
    basePath: '',
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      'test/loadtests.js'
    ],
    port: 3003,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage'],
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {
          type: 'html'
        },
        {
          type: 'text'
        }
      ]
    }
  };
  // We created a custom browser launcher that runs Chrome with the --no-sandbox option. 
  // And we only use it if the tests are running in Travis.
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
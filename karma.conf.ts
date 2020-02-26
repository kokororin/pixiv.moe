import path from 'path';
import Karma from 'karma';
import webpackCfg from './build/webpack.config.test';

process.env.CHROME_BIN = require('puppeteer').executablePath();

export default (config: Karma.Config) => {
  const configuration: Karma.ConfigOptions = {
    basePath: '',
    browsers: ['KarmaChromeHeadless'],
    customLaunchers: {
      KarmaChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    files: ['test/loadtests.ts'],
    port: 3003,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      // @ts-ignore
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage-istanbul'],
    preprocessors: {
      'test/loadtests.ts': ['webpack', 'sourcemap']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
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

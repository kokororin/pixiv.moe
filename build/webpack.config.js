const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const allowedEnvs = ['development', 'production'];

function buildConfig(wantedEnv) {
  const isValid =
    wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  const validEnv = isValid ? wantedEnv : 'development';
  process.env.NODE_ENV = validEnv;
  process.env.BABEL_ENV = validEnv;

  let config;
  if (validEnv === 'production') {
    config = prodConfig;
  } else {
    config = devConfig;
  }

  config = merge(baseConfig, config);
  return config;
}

module.exports = buildConfig(process.env.NODE_ENV);

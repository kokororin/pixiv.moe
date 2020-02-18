module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['kotori'],
  globals: {
    autobind: true
  },
  settings: {
    react: {
      version: require('react').version
    }
  },
  rules: {
    'linebreak-style': 'error',
    'react/sort-comp': 'off'
  }
};

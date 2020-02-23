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
  plugins: ['react', 'prettier'],
  extends: ['kotori', 'plugin:react/recommended'],
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
    'react/sort-comp': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error'
  }
};

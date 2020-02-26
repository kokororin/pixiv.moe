module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2019,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig-node.json'],
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
    mocha: true
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'kotori',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  globals: {
    autobind: true
  },
  settings: {
    react: {
      version: require('react').version
    }
  },
  rules: {
    'no-unused-vars': 'off',
    'no-invalid-this': 'off',
    'no-duplicate-imports': 'off',
    'react/sort-comp': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'linebreak-style': 'error',
    'prettier/prettier': 'error',
    // '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/require-await': 'error'
  }
};

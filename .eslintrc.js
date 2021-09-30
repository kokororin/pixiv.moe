module.exports = {
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig-server.json'],
    tsconfigRootDir: __dirname
  },
  env: {
    'jest/globals': true
  },
  plugins: ['prettier', 'jest'],
  extends: ['kotori/auto', 'prettier', 'plugin:react-hooks/recommended'],
  rules: {
    'no-duplicate-imports': 'off',
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/no-var-requires': 'off'
  }
};

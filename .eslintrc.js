module.exports = {
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig-node.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['prettier'],
  extends: ['kotori'],
  rules: {
    'no-duplicate-imports': 'off',
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off'
  }
};

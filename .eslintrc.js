/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'require-jsdoc': 0,
    'react/prop-types': 0,
    'valid-jsdoc': 0,
    'comma-dangle': [2, 'always-multiline'],
    indent: [2, 2, {SwitchCase: 1}],
  },
};

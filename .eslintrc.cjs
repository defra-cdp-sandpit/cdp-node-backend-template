module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
    jest: true,
    'jest/globals': true
  },
  extends: ['standard', 'prettier', 'plugin:jest-formatting/recommended'],
  overrides: [
    {
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'commonjs'
      }
    },
    {
      files: ['**/*.test.js'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest-formatting/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier', 'jest', 'jest-formatting'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error'
  },
  ignorePatterns: ['.server', '.public', 'src/__fixtures__', 'coverage']
}

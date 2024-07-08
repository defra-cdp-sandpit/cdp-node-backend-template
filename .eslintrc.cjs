module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
    jest: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'prettier',
    'plugin:import/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended'
  ],
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
  plugins: ['import', 'jest', 'jest-formatting', 'n', 'promise', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-console': 'error',

    // Check for mandatory file extensions
    // https://nodejs.org/api/esm.html#mandatory-file-extensions
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    // Skip rules handled by TypeScript compiler
    'import/default': 'off',
    'import/namespace': 'off',
    'n/no-extraneous-require': 'off',
    'n/no-extraneous-import': 'off',
    'n/no-missing-require': 'off',
    'n/no-missing-import': 'off'
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true
    }
  },
  ignorePatterns: ['.server', '.public', 'src/__fixtures__', 'coverage']
}

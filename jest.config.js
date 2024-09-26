/**
 * @type {Config}
 */
export default {
  rootDir: '.',
  testEnvironment: 'node',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/src/api/example',
    '<rootDir>/src/api/router.js',
    '<rootDir>/src/api/server.js',
    '<rootDir>/src/index.js'
  ],
  coverageDirectory: '<rootDir>/coverage'
}

/**
 * @import { Config } from 'jest'
 */

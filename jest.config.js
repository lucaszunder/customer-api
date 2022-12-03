const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  //testMatch: ['*/tests//.test.(ts|js)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  coveragePathIgnorePatterns: [
    './node_modules/',
    './docs/',
    './tests/',
    './dist/',
    './terraform/',
    'src/api.ts',
    './development',
    'src/config/environment/environmentTypes',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

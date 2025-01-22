/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$', // Match test files
};

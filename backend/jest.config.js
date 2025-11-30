module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/swagger.js',
  ],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
};

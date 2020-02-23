module.exports = {
  ...require('./jest/jest.common.config'),
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  projects: ['./jest/jest.client.config.js', './jest/jest.node.config.js'],
};

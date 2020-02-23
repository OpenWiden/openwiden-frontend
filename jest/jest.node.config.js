const TEST_REGEX = '\\.node\\.test\\.(ts?|js?)$';

module.exports = {
  ...require('./jest.common.config'),
  displayName: 'server',
  testRegex: TEST_REGEX,
  testEnvironment: 'jest-environment-node',
};

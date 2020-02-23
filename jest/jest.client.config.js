const TEST_REGEX = '^(?!.*\\.node)(.*)\\.test\\.(ts?|js?)$';

module.exports = {
  ...require('./jest.common.config'),
  displayName: 'client',
  testRegex: TEST_REGEX,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
};

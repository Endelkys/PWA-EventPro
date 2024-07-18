module.exports = {
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom']
};

const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      { configFile: path.join(__dirname, "src/__tests__/babel.config.js") }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/__mocks__/next/image.js'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/src/__tests__/babel.config.js'
  ]
};



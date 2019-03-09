module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', '<rootDir>/src/common'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/common/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/common/__mocks__/styleMock.js',
  },
};

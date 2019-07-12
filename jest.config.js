module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransform.js',
  },
  setupFiles: ['raf/polyfill', 'jest-localstorage-mock'],
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|react-navigation|react-select)'],
  coverageReporters: ['lcov'],
  moduleDirectories: ['node_modules', 'src/frontend', 'src/shared'],
  testPathIgnorePatterns: ['/tests/e2e/'],
  setupFilesAfterEnv: ['raf/polyfill'],
}

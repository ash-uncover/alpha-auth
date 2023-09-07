module.exports = {
  modulePaths: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/index.*'
  ],
  coverageDirectory: '__coverage__',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary'
  ]
}

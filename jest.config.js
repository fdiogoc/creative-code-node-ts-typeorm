module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
    '@App/(.*)': '<rootDir>/src/$1',
    '@Test/(.*)': '<rootDir>/test/$1',
  },
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
    '@App/(.*)': '<rootDir>/src/$1',
    '@Test/(.*)': '<rootDir>/test/$1',
  },
};

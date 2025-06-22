module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/cjs-test'],
  setupFilesAfterEnv: ['<rootDir>/cjs-test/setup.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['cjs-test/**/*.{js,jsx,ts,tsx}'],
};

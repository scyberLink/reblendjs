module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/cjs-test'],
  testMatch: ['<rootDir>/cjs-test/**/*Spec.js'],
  setupFilesAfterEnv: ['<rootDir>/cjs-test/setup.js'],
  //coverageDirectory: 'coverage',
  //collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  moduleDirectories: ['node_modules', '../../node_modules'],
};

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
module.exports = {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1"
  },
  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/tests",
    "<rootDir>/src"
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    "\\.ts$": "ts-jest"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/main/config/",
    ".*\\/index\\.ts$"
  ],
  clearMocks: true
}

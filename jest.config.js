module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
  }
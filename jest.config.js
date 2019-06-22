const { createJestConfig } = require('create-react-styleguide');

module.exports = createJestConfig({
    setupFilesAfterEnv: ['jest-styled-components'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/styleguidist/',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    }
});

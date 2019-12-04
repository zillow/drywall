const { createJestConfig } = require('create-react-styleguide');

module.exports = createJestConfig({
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    }
});

const path = require('path');
const { createStyleguideConfig } = require('create-react-styleguide');

module.exports = createStyleguideConfig({
    usageMode: 'expand',
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
    },
    sections: [{
        name: 'Releases ↗',
        href: 'https://github.com/zillow/drywall/blob/master/CHANGELOG.md',
        external: true
    }, {
        name: 'Introduction',
        content: 'packages/drywall/README.md'
    }, {
        name: "Components",
        components: "packages/drywall/src/**/[A-Z]*.jsx"
    }],
    getComponentPathLine: componentPath => {
        const name = path.basename(componentPath, '.jsx');
        return `import { ${name} } from 'drywall';`;
    }
}, {
    componentsSection: false,
});

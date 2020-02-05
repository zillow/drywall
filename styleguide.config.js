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
        name: 'drywall',
        components: 'packages/drywall/src/**/[A-Z]*.jsx'
    }, {
        name: 'styled-drywall',
        components: 'packages/styled-drywall/src/**/[A-Z]*.jsx'
    }, {
        name: 'styled-token',
        content: 'packages/styled-token/README.md'
    }],
    getComponentPathLine: componentPath => {
        const pkg = componentPath.match(/packages\/(.*?)\//)[1];
        const name = path.basename(componentPath, '.jsx');
        return `import { ${name} } from '${pkg}';`;
    }
}, {
    componentsSection: false,
});

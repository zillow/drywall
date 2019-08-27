const path = require('path');
const { createStyleguideConfig } = require('create-react-styleguide');

let config = createStyleguideConfig({
    usageMode: 'expand',
    serverPort: +process.env.PORT || 6060,
    sections: [{
        name: 'Releases ↗',
        href: 'https://github.com/zillow/drywall/blob/master/CHANGELOG.md',
        external: true
    }, {
        name: 'Introduction',
        content: 'README.md'
    }, {
        name: 'Theming',
        content: 'docs/theming.md',
    }],
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguidist/ThemeWrapper'),
    },
    getComponentPathLine: componentPath => {
        const name = path.basename(componentPath, '.jsx');
        return `import { ${name} } from 'drywall';`;
    }
});

const TRANSFORMS_FOR_IE11 = {
    test: /\.jsx?$/,
    include: /node_modules\/(?=(acorn-jsx|estree-walker|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|react-dev-utils|ansi-styles|ansi-regex|chalk|strip-ansi)\/).*/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            ie: "11"
                        }
                    }
                ]
            ]
        }
    }
};

config.webpackConfig.module.rules = [
    TRANSFORMS_FOR_IE11,
    ...config.webpackConfig.module.rules
];

module.exports = config;

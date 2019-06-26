const path = require('path');
const { createStyleguideConfig } = require('create-react-styleguide');

module.exports = createStyleguideConfig({
    sections: [{
        name: 'Releases ↗',
        href: 'https://github.com/zillow/drywall/blob/master/CHANGELOG.md',
        external: true
    }, {
        name: 'README',
        content: 'README.md'
    }, {
        name: 'Theming',
        content: 'docs/theming.md',
    }],
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguidist/ThemeWrapper'),
    },
});

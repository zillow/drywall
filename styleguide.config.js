const path = require('path');
const { createStyleguideConfig } = require('create-react-styleguide');

module.exports = createStyleguideConfig({
    usageMode: 'expand',
    sections: [{
        name: 'Releases ↗',
        href: 'https://github.com/zillow/drywall/blob/master/CHANGELOG.md',
        external: true
    }, {
        name: 'Introduction',
        content: 'README.md'
    }],
    getComponentPathLine: componentPath => {
        const name = path.basename(componentPath, '.jsx');
        return `import { ${name} } from 'drywall';`;
    }
});

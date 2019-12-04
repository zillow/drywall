import path from 'path';
import glob from 'glob';
import * as drywall from '../index';

describe('drywall exports', () => {
    it('exports component properties', () => {
        const components = glob.sync(path.join(__dirname, '../components/**/*.jsx'));
        components.forEach(component => {
            // eslint-disable-next-line
            const module = require(component);
            const basename = path.basename(component, '.jsx');
            Object.keys(module).forEach(key => {
                if (key === 'default') {
                    expect(drywall).toHaveProperty(basename);
                } else {
                    expect(drywall).toHaveProperty(key);
                }
            });
        });
    });
});

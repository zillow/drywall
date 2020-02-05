import { stringToPath } from './stringToPath';

/**
 * See README.md for full documentation.
 *
 * @method
 * @param path {string|array}
 * @param [options] {object}
 * @param [callback] {function}
 * @return {function}
 */
export default (path, options = {}, callback) => props => {
    if (typeof options === 'function') {
        // eslint-disable-next-line no-param-reassign
        callback = options;
        // eslint-disable-next-line no-param-reassign
        options = {};
    }

    let val = props.theme;

    // Check for namespace
    let namespace = props.theme && props.theme.NAMESPACE;
    if (typeof options.namespace === 'string') {
        // eslint-disable-next-line prefer-destructuring
        namespace = options.namespace;
    }

    // Move to namespace
    if (val && namespace) {
        val = val[namespace];
    }

    let paths = path;
    if (typeof paths !== 'object') {
        paths = [path];
    }

    // Iterate through paths
    const originalVal = val;
    for (let i = 0; i < paths.length; i += 1) {
        const p = paths[i];

        // Reset val if we need to try another path
        val = originalVal;

        // Traverse the path
        const properties = stringToPath(p);
        for (let j = 0; j < properties.length && typeof val !== 'undefined'; j += 1) {
            const property = properties[j];
            // Skip empty string properties
            if (property) {
                val = val[property];
            }
        }

        // Break out of paths array once we find the first defined value
        if (typeof val !== 'undefined') {
            break;
        }
    }

    // defaultValue fallback
    if (typeof val === 'undefined') {
        val = options.defaultValue;
    }

    if (callback) {
        return callback(val);
    }
    return val;
};

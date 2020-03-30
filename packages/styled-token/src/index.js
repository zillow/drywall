import { stringToPath } from './stringToPath';

/**
 * Helper function for getting the value for a path or a fallback array.
 *
 * @method
 * @param path {string|array}
 * @param theme {object} The theme namespace.
 * @return {object} The derived value and an array of all values.
 */
const getValues = (path, theme) => {
    let paths = path;
    if (typeof path === 'string') {
        paths = [path];
    }

    // Translate the array of paths to an array of values
    let value;
    const values = paths.map(p => {
        let currentValue = theme;

        // Traverse the path
        const properties = stringToPath(p);
        for (let j = 0; j < properties.length && typeof currentValue !== 'undefined'; j += 1) {
            const property = properties[j];
            // Skip empty string properties
            if (property) {
                currentValue = currentValue[property];
            }
        }

        // Set outer value to the first defined value
        if (typeof value === 'undefined') {
            value = currentValue;
        }

        return currentValue;
    });

    return {
        value,
        values,
    };
};

/**
 * See README.md for full documentation.
 *
 * @method
 * @param path {string|array|object}
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

    let { theme } = props;

    // Check for namespace
    let namespace = theme && theme.NAMESPACE;
    if (typeof options.namespace === 'string') {
        // eslint-disable-next-line prefer-destructuring
        namespace = options.namespace;
    }

    // Move to namespace
    if (theme && namespace) {
        theme = theme[namespace];
    }

    let value;
    let values;
    if (typeof path === 'string' || Array.isArray(path)) {
        const results = getValues(path, theme);
        // eslint-disable-next-line prefer-destructuring
        value = results.value;
        // eslint-disable-next-line prefer-destructuring
        values = results.values;
    } else if (typeof path === 'object') {
        if (!callback) {
            throw new Error('`callback` is required when `path` is an `object`');
        }

        value = {};
        Object.keys(path).forEach(key => {
            const results = getValues(path[key], theme);
            value[key] = results.value;
        });
    } else {
        throw new Error('`path` should be one of `string`, `array`, `object`');
    }

    // defaultValue fallback
    if (typeof value === 'undefined') {
        value = options.defaultValue;
    }

    if (callback) {
        // Arrays gets both the derived value and the list of values as arguments
        if (Array.isArray(path)) {
            return callback(value, values);
        }
        return callback(value);
    }
    return value;
};

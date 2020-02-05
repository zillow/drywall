// lodash stringToPath
// https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L6735

/** Used to match property names within property paths. */
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
export const stringToPath = string => {
    const result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
    }
    string.replace(rePropName, (match, number, quote, subString) => {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
};

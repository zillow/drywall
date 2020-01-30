/**
 * A helper function similar to lodash's [_.get]{@link https://lodash.com/docs/#get} that will
 * return a token from the theme object. The function supports namespacing via the DRYWALL_NAMESPACE
 * property on the theme, or the namespace parameter on the function.<br>
 *
 * NOTE: This is not a traditional getter function -- this function returns a function that can be
 * interpolated by styled-components at call time. If you want access to the value immediately,
 * you have to pass it the props.
 *
 * @example
 * // Default usage within a styled-components css template
 * const styles = css`
 *     color: ${t('colors.blue')};
 * `;
 *
 * // Using a different "foo" namespace
 * const styles = css`
 *     color: ${t('colors.blue', 'foo')};
 * `;
 *
 * // Disables the use of any namespace
 * const styles = css`
 *     color: ${t('colors.blue', false)};
 * `;
 *
 * // BAD
 * const styles = css`
 *     color: ${t('colors.blues')[0]};
 * `;
 * // GOOD
 * const styles = css`
 *     color: ${t('colors.blues[0]')};
 * `;
 *
 * // BAD
 * const styles = css`
 *     font-family: ${t('fonts.sansSerif').replace('Tahoma', 'Geneva')};
 * `;
 * // GOOD
 * const styles = props => css`
 *     font-family: ${t('fonts.sansSerif')(props).replace('Tahoma', 'Geneva')};
 * `;
 *
 * @method
 * @param path {string} The path to the theme token value.
 * @param [namespace=true] {string|boolean} When `true`, the token path will be pulled from the
 *    `DRYWALL_NAMESPACE` value on the theme. You can override that value by specifying your own
 *    string value, or disable it completely by setting it to `false`.
 * @return {function}
 */
export const token = (path, namespace = true) => props => {
    let val = props.theme;
    if (typeof val === 'undefined') {
        return val;
    }

    // Check for namespace
    let ns;
    if (namespace && typeof namespace === 'string') {
        ns = namespace;
    } else if (namespace === true) {
        ns = props.theme && props.theme.DRYWALL_NAMESPACE;
    }

    // Move to namespace
    if (ns) {
        val = val[ns];
    }

    // Traverse the path
    const properties = path.split(/[.[\]]/g);
    for (let i = 0; i < properties.length && typeof val !== 'undefined'; i += 1) {
        const property = properties[i];
        // Skip empty string properties
        if (property) {
            val = val[property];
        }
    }

    return val;
};

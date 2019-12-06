import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple [HTML button](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
 * that adds ARIA roles for non-semantic elements.
 *
 * ##### Accessibility
 * * https://www.w3.org/TR/wai-aria-practices/#button
 * * https://www.w3.org/TR/wai-aria-1.1/#button
 */
const Button = React.forwardRef(({ as, ...rest }, ref) => {
    const props = { ...rest };
    if (as !== 'button') {
        props.role = 'button';
    }
    return React.createElement(as, { ...props, ref });
});

Button.propTypes = {
    /**
     * Use the `as` prop to use a different HTML element than the default "button".
     * Elements other than "button" will receive the
     * [ARIA button role](https://www.w3.org/TR/wai-aria-1.1/#button).
     */
    as: PropTypes.string,
};

Button.defaultProps = {
    as: 'button',
};

export default Button;

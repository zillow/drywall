import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple [HTML checkbox input](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).
 */
const Checkbox = props => <input type="checkbox" {...props} />;

Checkbox.propTypes = {
    /**
     * The checked state for a
     * [controlled input](https://reactjs.org/docs/forms.html#controlled-components).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    checked: PropTypes.bool,
    /**
     * The default checked state for an
     * [uncontrolled input](https://reactjs.org/docs/uncontrolled-components.html).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    defaultChecked: PropTypes.bool,
};

export default Checkbox;

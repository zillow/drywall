import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple [HTML textarea](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
 */
const Textarea = props => <textarea {...props} />;

Textarea.propTypes = {
    /**
     * The value for a
     * [controlled input](https://reactjs.org/docs/forms.html#controlled-components).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    value: PropTypes.string,
    /**
     * The default value for an
     * [uncontrolled input](https://reactjs.org/docs/uncontrolled-components.html).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    defaultValue: PropTypes.string,
};

export default Textarea;

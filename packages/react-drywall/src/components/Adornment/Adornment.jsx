import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label/Label';

/**
 * An ornamental label for [`Input`](#input) fields.
 */
const Adornment = React.forwardRef((props, ref) => <Label ref={ref} {...props} />);

Adornment.propTypes = {
    /**
     * Adornments are considered ornamental and set `aria-hidden="true"` by default.
     * If you believe your adornment is providing additional context without repeating content
     * already present in the form field label, consider setting this to false.
     */
    'aria-hidden': PropTypes.oneOf(['true', 'false']),
};

Adornment.defaultProps = {
    'aria-hidden': 'true',
};

export default Adornment;

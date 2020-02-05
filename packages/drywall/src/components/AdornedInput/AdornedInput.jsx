import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field/Field';

const AdornedInput = React.forwardRef(({ input, leftAdornment, rightAdornment, ...rest }, ref) => (
    <Field ref={ref} {...rest}>
        {input}
        {leftAdornment && React.cloneElement(leftAdornment, { position: 'left' })}
        {rightAdornment && React.cloneElement(rightAdornment, { position: 'right' })}
    </Field>
));

AdornedInput.propTypes = {
    leftAdornment: PropTypes.node,
    rightAdornment: PropTypes.node,
    input: PropTypes.node.isRequired,
};

AdornedInput.defaultProps = {
    leftAdornment: undefined,
    rightAdornment: undefined,
};

export default AdornedInput;

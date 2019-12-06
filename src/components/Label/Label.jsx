import React from 'react';
import PropTypes from 'prop-types';
import FieldContext from '../../js/FieldContext';

/**
 * A simple [HTML label](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).
 */
const Label = ({ htmlFor, ...rest }) => {
    const { controlId } = React.useContext(FieldContext);
    return <label htmlFor={htmlFor || controlId} {...rest} />;
};

Label.propTypes = {
    /**
     * The id for the input this labels.
     */
    // eslint-disable-next-line zillow/react/require-default-props
    htmlFor: PropTypes.string,
};

export default Label;

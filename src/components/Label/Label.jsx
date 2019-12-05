import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple [HTML label](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).
 */
// eslint-disable-next-line zillow/jsx-a11y/label-has-associated-control
const Label = props => <label {...props} />;

Label.propTypes = {
    /**
     * The id for the input this labels.
     */
    htmlFor: PropTypes.string.isRequired,
};

export default Label;

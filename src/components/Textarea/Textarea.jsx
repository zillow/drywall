import React from 'react';
import PropTypes from 'prop-types';
import FieldContext from '../../js/FieldContext';

/**
 * A simple [HTML textarea](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
 */
const Textarea = React.forwardRef(({ id, ...rest }, ref) => {
    const { controlId } = React.useContext(FieldContext);
    return <textarea ref={ref} id={id || controlId} {...rest} />;
});

Textarea.propTypes = {
    /**
     * The default value for an
     * [uncontrolled input](https://reactjs.org/docs/uncontrolled-components.html).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    defaultValue: PropTypes.string,
    /**
     * [Native attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
     */
    // eslint-disable-next-line zillow/react/require-default-props
    id: PropTypes.string,
    /**
     * The value for a
     * [controlled input](https://reactjs.org/docs/forms.html#controlled-components).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    value: PropTypes.string,
};

export default Textarea;

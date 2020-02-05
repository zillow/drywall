import React from 'react';
import PropTypes from 'prop-types';
import FieldContext from '../../js/FieldContext';

/**
 * A simple [HTML radio input](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).
 */
const Radio = React.forwardRef(({ id, ...rest }, ref) => {
    const { controlId } = React.useContext(FieldContext);
    return <input ref={ref} type="radio" id={id || controlId} {...rest} />;
});

Radio.propTypes = {
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
    /**
     * The unique HTML name attribute that connects radio inputs.
     */
    name: PropTypes.string.isRequired,
    /**
     * [Native attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
     */
    // eslint-disable-next-line zillow/react/require-default-props
    id: PropTypes.string,
};

export default Radio;
import React from 'react';
import PropTypes from 'prop-types';
import FieldContext from '../../js/FieldContext';

/**
 * A simple [HTML range input](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range).
 */
const Range = React.forwardRef(({ id, ...rest }, ref) => {
    const { controlId } = React.useContext(FieldContext);
    return <input ref={ref} type="range" id={id || controlId} {...rest} />;
});

Range.propTypes = {
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
     * [Native attribute](
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#max)
     */
    max: PropTypes.string.isRequired,
    /**
     * [Native attribute](
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#min)
     */
    min: PropTypes.string.isRequired,
    /**
     * [Native attribute](
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#step)
     */
    step: PropTypes.string,
    /**
     * The value for a
     * [controlled input](https://reactjs.org/docs/forms.html#controlled-components).
     */
    // eslint-disable-next-line zillow/react/require-default-props
    value: PropTypes.string,
};

Range.defaultProps = {
    step: '1',
};

export default Range;

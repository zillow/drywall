import React from 'react';
import PropTypes from 'prop-types';
import FieldContext from '../../js/FieldContext';
import { identifier } from '../../js/identifier';

/**
 * A `Field` is a grouping of a form control, label, and any other associated content.
 * Form controls and labels are automatically associated with `htmlFor` and `id` if none are
 * provided.
 */
const Field = React.forwardRef(({ as, controlId, ...rest }, ref) => (
    <FieldContext.Provider value={{ controlId: controlId || identifier() }}>
        {React.createElement(as, { ...rest, ref })}
    </FieldContext.Provider>
));

Field.propTypes = {
    /**
     * Use the `as` prop to use a different HTML element than the default "div".
     */
    as: PropTypes.string,
    /**
     * The identifier used to associate the form control and label. If not defined, an identifier
     * will automatically be generated.
     */
    // eslint-disable-next-line zillow/react/require-default-props
    controlId: PropTypes.string,
};

Field.defaultProps = {
    as: 'div',
};

export default Field;

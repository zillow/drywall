import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple [HTML field set](
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset).
 */
const FieldSet = React.forwardRef(({ children, legend, ...rest }, ref) => (
    <fieldset ref={ref} {...rest}>
        {legend}
        {children}
    </fieldset>
));

FieldSet.propTypes = {
    /**
     * A group of form control fields.
     */
    children: PropTypes.node.isRequired,
    /**
     * An [HTML legend](
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element that will be used
     * to caption the group of controls.
     */
    legend: PropTypes.node.isRequired,
};

export default FieldSet;

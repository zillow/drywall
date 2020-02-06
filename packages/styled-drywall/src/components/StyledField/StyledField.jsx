import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from '@zillow/drywall';
import { fieldMixin } from '../../mixins/fieldMixin';

/**
 * The drywall [`Field`](#field) component as a styled component using `fieldMixin`.
 */
const StyledField = styled(({ direction, inline, ...rest }) => <Field {...rest} />)`
    ${fieldMixin}
`;

StyledField.propTypes = {
    /**
     * Change the `flex-direction` layout.
     */
    direction: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
    /**
     * Change the layout to `inline-flex`.
     */
    inline: PropTypes.bool,
};

StyledField.defaultProps = {
    direction: 'column',
    inline: false,
};

/**
 * @component
 */
export default StyledField;

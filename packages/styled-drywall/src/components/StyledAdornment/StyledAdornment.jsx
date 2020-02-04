import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Adornment } from '@zillow/drywall';
import {
    adornmentMixin,
    adornmentLeftMixin,
    adornmentRightMixin,
} from '../../mixins/adornmentMixin';

export const ADORNMENT_POSITIONS = {
    left: 'left',
    right: 'right',
};

export const StyledAdornmentLeft = styled(Adornment)`
    ${adornmentLeftMixin}
`;

export const StyledAdornmentRight = styled(Adornment)`
    ${adornmentRightMixin}
`;

const StyledAdornmentComponent = React.forwardRef(
    ({ AdornmentLeft, AdornmentRight, position, ...rest }, ref) => {
        if (position === ADORNMENT_POSITIONS.left) {
            return <AdornmentLeft ref={ref} {...rest} />;
        }
        return <AdornmentRight ref={ref} {...rest} />;
    }
);

/**
 * This is a generic adornment for [`StyledAdornedInput`](#styledadornedinput).
 */
const StyledAdornment = styled(StyledAdornmentComponent)`
    ${adornmentMixin}
`;

StyledAdornment.propTypes = {
    /** The position of the adornment relative to the input. */
    position: PropTypes.oneOf(Object.keys(ADORNMENT_POSITIONS)),
    /** The default component for `position="left"` adornments. */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    AdornmentLeft: PropTypes.any,
    /** The default component for `position="right"` adornments. */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    AdornmentRight: PropTypes.any,
};

StyledAdornment.defaultProps = {
    position: ADORNMENT_POSITIONS.left,
    AdornmentLeft: StyledAdornmentLeft,
    AdornmentRight: StyledAdornmentRight,
};

StyledAdornmentComponent.propTypes = StyledAdornment.propTypes;
StyledAdornmentComponent.defaultProps = StyledAdornment.defaultProps;

/**
 * @component
 */
export default StyledAdornment;

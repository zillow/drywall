import PropTypes from 'prop-types';
import styled from 'styled-components';

export const BUTTON_TYPES = {
    primary: 'primary',
    secondary: 'secondary',
    caution: 'caution',
};

export const BUTTON_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};

/**
 * An HTML `<button>` element.
 *
 * ##### Accessibility
 * * https://www.w3.org/TR/wai-aria-practices/#button
 *
 * ##### Inspiration
 * * https://getbootstrap.com/docs/4.3/components/buttons/
 * * https://material-ui.com/components/buttons/
 * * https://lightningdesignsystem.com/components/buttons/
 * * https://atlaskit.atlassian.com/packages/core/button
 */
const Button = styled.button`
    ${props => props.theme && props.theme.ns && props.theme.ns().Button};
`;

Button.propTypes = {
    /** A fluid button will take up all horizontal space */
    fluid: PropTypes.bool,
    /** Inverse colors for use on dark or colored backgrounds */
    inverse: PropTypes.bool,
    /** The size of the button */
    buttonSize: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
    /** The type of the button */
    buttonType: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
};

Button.defaultProps = {
    fluid: false,
    inverse: false,
    buttonSize: BUTTON_SIZES.md,
    buttonType: BUTTON_TYPES.secondary,
};

/** @component */
export default Button;

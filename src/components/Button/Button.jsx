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

const Button = styled.button`
    ${props => props.theme && props.theme.ns && props.theme.ns().Button};
`;

Button.propTypes = {
    /** A fluid button will take up all horizontal space */
    fluid: PropTypes.bool,
    /** Inverse colors for use on dark or colored backgrounds */
    inverse: PropTypes.bool,
    /** The size of the button */
    size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
    /** The type of the button */
    buttonType: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
    /**
     * Use the styled-components
     * [polymorphic "as" prop](https://www.styled-components.com/docs/api#as-polymorphic-prop)
     * to change the HTML tag of the component.
     *
     * This can be used to apply `Button` styling to HTML anchors.
     */
    as: PropTypes.string,
};

Button.defaultProps = {
    fluid: false,
    inverse: false,
    size: BUTTON_SIZES.md,
    buttonType: BUTTON_TYPES.secondary,
    as: 'button',
};

/** @component */
export default Button;
export const StyledButton = Button;

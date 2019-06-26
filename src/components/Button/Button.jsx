import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    /**
     * Button `appearance` is used for giving different meaning to a button within a `variant`.
     * For example, a "primary" button might look different from a "secondary" or "tertiary" button,
     * or a "danger" button might be styled to really stand out to warn the user.
     *
     * e.g. `"primary"`, `"secondary"`, `"tertiary"`, `"danger"`
     */
    appearance: PropTypes.string,
    /**
     * Use `buttonSize` to adjust the size of the button.
     *
     * e.g. `"sm"`, `"md"`, `"lg"`
     */
    buttonSize: PropTypes.string,
    /**
     * A `fluid` button will take up all horizontal space, acting like a block level element.
     */
    fluid: PropTypes.bool,
    /**
     * An `inverse` button should be used when the background is dark or colored to provide proper
     * contrast.
     */
    inverse: PropTypes.bool,
    /**
     * Button `variant` defines the structure of a button, which provides a consistent look and feel
     * across different `appearance` values.
     * An example would be a "solid" versus an "outline" button, or a "text" button that behaves
     * more like a link.
     *
     * e.g. `"default"`, `"solid"`, `"outline"`, `"text"`
     */
    variant: PropTypes.string,
};

Button.defaultProps = {
    fluid: false,
    inverse: false,
};

/** @component */
export default Button;

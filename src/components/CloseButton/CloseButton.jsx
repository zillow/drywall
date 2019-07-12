import styled from 'styled-components';
import getTheme from '../../theme/getTheme';

/**
 * An HTML `<button>` element used for closing content such as dialogs.
 */
const CloseButton = styled.button`
    ${getTheme('CloseButton')}
`;

/** @component */
export default CloseButton;

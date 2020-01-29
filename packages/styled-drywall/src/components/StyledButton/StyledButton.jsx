import styled from 'styled-components';
import { Button } from '@zillow/drywall';
import { buttonMixin } from '../../mixins/buttonMixin';

/**
 * The drywall [`Button`](#button) component as a styled component using `buttonMixin`.
 *
 * @component
 */
export default styled(Button)`
    ${buttonMixin}
`;

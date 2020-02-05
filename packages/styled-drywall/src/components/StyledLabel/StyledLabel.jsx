import styled from 'styled-components';
import { Label } from '@zillow/drywall';
import { labelMixin } from '../../mixins/labelMixin';

/**
 * The drywall [`Label`](#label) component as a styled component using `labelMixin`.
 *
 * @component
 */
export default styled(Label)`
    ${labelMixin}
`;

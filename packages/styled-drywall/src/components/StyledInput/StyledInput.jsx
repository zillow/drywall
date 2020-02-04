import styled from 'styled-components';
import { Input } from '@zillow/drywall';
import { inputMixin } from '../../mixins/inputMixin';

/**
 * The drywall [`Input`](#input) component as a styled component using `inputMixin`.
 *
 * @component
 */
export default styled(Input)`
    ${inputMixin}
`;

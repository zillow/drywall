import styled from 'styled-components';
import { Select } from '@zillow/drywall';
import { selectMixin } from '../../mixins/selectMixin';

/**
 * The drywall [`Select`](#select) component as a styled component using `selectMixin`.
 *
 * @component
 */
export default styled(Select)`
    ${selectMixin}
`;

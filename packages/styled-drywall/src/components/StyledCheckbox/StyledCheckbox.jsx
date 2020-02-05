import styled from 'styled-components';
import { Checkbox } from '@zillow/drywall';
import { checkboxMixin } from '../../mixins/checkboxMixin';

/**
 * The drywall [`Checkbox`](#checkbox) component as a styled component using `checkboxMixin`.
 *
 * @component
 */
export default styled(Checkbox)`
    ${checkboxMixin}
`;

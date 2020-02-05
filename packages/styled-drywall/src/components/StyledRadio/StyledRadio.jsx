import styled from 'styled-components';
import { Radio } from '@zillow/drywall';
import { radioMixin } from '../../mixins/radioMixin';

/**
 * The drywall [`Radio`](#radio) component as a styled component using `radioMixin`.
 *
 * @component
 */
export default styled(Radio)`
    ${radioMixin}
`;

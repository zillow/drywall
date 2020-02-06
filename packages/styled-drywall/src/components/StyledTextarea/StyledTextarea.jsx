import styled from 'styled-components';
import { Textarea } from '@zillow/drywall';
import { textareaMixin } from '../../mixins/textareaMixin';

/**
 * The drywall [`Textarea`](#textarea) component as a styled component using `textareaMixin`.
 *
 * @component
 */
export default styled(Textarea)`
    ${textareaMixin}
`;

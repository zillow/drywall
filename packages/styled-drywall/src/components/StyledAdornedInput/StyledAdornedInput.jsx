import styled from 'styled-components';
import { AdornedInput } from '@zillow/drywall';
import { adornedInputMixin } from '../../mixins/adornedInputMixin';

const StyledAdornedInput = styled(AdornedInput)`
    ${adornedInputMixin}
`;

export default StyledAdornedInput;

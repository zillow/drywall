import { css } from 'styled-components';
import t from 'styled-token';
import StyledLabel from '../components/StyledLabel/StyledLabel';
import StyledInput from '../components/StyledInput/StyledInput';
import StyledSelect from '../components/StyledSelect/StyledSelect';
import StyledTextarea from '../components/StyledTextarea/StyledTextarea';

export const columnCSS = css`
    ${StyledLabel}:first-child {
        margin-bottom: ${t('space[1]')};
    }
    ${StyledLabel}:not(:first-child) {
        margin-top: ${t('space[1]')};
    }
`;

export const rowCSS = css`
    align-items: center;

    ${StyledLabel}:first-child {
        margin-right: ${t('space[1]')};
    }
    ${StyledLabel}:not(:first-child) {
        margin-left: ${t('space[1]')};
    }
`;

export const fieldMixin = ({ direction, inline }) => css`
    display: ${inline ? 'inline-' : ''}flex;
    flex-direction: ${direction};

    ${direction.indexOf('row') === 0 ? rowCSS : columnCSS}

    ${StyledInput}, ${StyledSelect}, ${StyledTextarea} {
        flex-grow: 1;
    }
`;

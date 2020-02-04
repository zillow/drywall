import { css } from 'styled-components';
import t from 'styled-token';

export const inputMixin = css`
    display: inline-block;
    cursor: text;

    background-color: ${t('Inputs.backgroundColor')};
    border: ${t('Inputs.borderWidth')} solid ${t('Inputs.borderColor')};
    color: ${t('Inputs.color')};
    padding: ${t('Inputs.padding')};
    border-radius: ${t('Inputs.borderRadius')};
    font-size: ${t('Inputs.fontSize')};
    font-family: ${t('Inputs.fontFamily')};

    &::placeholder {
        color: ${t('Inputs.borderColor')};
    }
`;

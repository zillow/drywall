import { css } from 'styled-components';
import t from 'styled-token';

export const inputMixin = css`
    background-color: ${t('Inputs.backgroundColor')};
    border: ${t('Inputs.border')};
    color: ${t('Inputs.color')};
    padding: ${t('Inputs.padding')};
    border-radius: ${t('Inputs.borderRadius')};
    font-size: ${t('Inputs.fontSize')};
`;

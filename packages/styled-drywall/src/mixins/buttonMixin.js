import { css } from 'styled-components';
import t from 'styled-token';

export const buttonMixin = css`
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    user-select: none;

    background-color: ${t('Buttons.backgroundColor')};
    border: ${t('Buttons.borderWidth')} solid ${t('Buttons.borderColor')};
    color: ${t('Buttons.color')};
    padding: ${t('Buttons.padding')};
    border-radius: ${t('Buttons.borderRadius')};
    font-size: ${t('Buttons.fontSize')};
    font-family: ${t('Buttons.fontFamily')};
`;

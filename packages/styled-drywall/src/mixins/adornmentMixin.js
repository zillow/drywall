import { css } from 'styled-components';
import t from 'styled-token';
import { inputMixin } from './inputMixin';

export const adornmentMixin = css`
    ${inputMixin}
    user-select: none;
    color: ${t('Inputs.borderColor')};
`;

export const adornmentLeftMixin = css`
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: 0 !important;
`;

export const adornmentRightMixin = css`
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-left: 0 !important;
`;

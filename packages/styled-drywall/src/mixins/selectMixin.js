import { css } from 'styled-components';
import t from 'styled-token';
import { inputMixin } from './inputMixin';

const bgHeight = '8px';
const bgWidth = '10px';

export const selectMixin = css`
    ${inputMixin}
    appearance: none;
    padding-right: calc(${t('Inputs.padding')} * 2 + ${bgWidth});
    background: ${t('Inputs.backgroundColor')}
        url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
        no-repeat right ${t('Inputs.padding')} center/ ${bgHeight} ${bgWidth};
`;

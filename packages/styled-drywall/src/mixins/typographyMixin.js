import { css } from 'styled-components';
import t from 'styled-token';

export const typographyMixin = css`
    font-family: ${t('fonts.sans-serif')};
    font-size: ${t('fontSizes[2]')};
    font-weight: ${t('fontWeights[2]')};
    color: ${t('colors.black')};
`;

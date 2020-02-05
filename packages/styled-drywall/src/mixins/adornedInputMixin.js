import { css } from 'styled-components';
import StyledAdornment, {
    StyledAdornmentLeft,
} from '../components/StyledAdornment/StyledAdornment';
import StyledInput from '../components/StyledInput/StyledInput';
import { outlineMixin } from './outlineMixin';

const leftCSS = css`
    padding-left: 0;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const rightCSS = css`
    padding-right: 0;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

export const adornedInputMixin = ({ leftAdornment, rightAdornment }) => css`
    display: inline-flex;

    ${StyledAdornment} {
        /**
         * Make sure label does not shrink in IE11
         * https://stackoverflow.com/questions/42510904/inline-flex-item-does-not-grow-with-its-content-in-internet-explorer
         */
        flex: 0 0 auto;
    }

    ${StyledAdornmentLeft} {
        order: -1;
    }

    ${StyledInput} {
        outline: none;

        /**
         * Per the spec (and Firefox, but not Chrome), min-width defaults to auto.
         * Set to 0 to allow collapsing of the input.
         * https://www.w3.org/TR/css-flexbox-1/#min-size-auto
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1088586
         */
        min-width: 0;

        ${leftAdornment ? leftCSS : ''}
        ${rightAdornment ? rightCSS : ''}
    }

    position: relative;
    ${StyledInput}:focus + ${StyledAdornment}:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

        ${outlineMixin}
    }
`;

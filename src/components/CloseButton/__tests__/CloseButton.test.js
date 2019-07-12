import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css, isStyledComponent } from 'styled-components';
import { CloseButton } from '../../../index';
import { createTestTheme } from '../../../test/util';

describe('<CloseButton>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<CloseButton />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
    it('can render with theme', () => {
        const theme = createTestTheme({
            CloseButton: css`
                color: red;
            `,
        });
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={theme}>
                <CloseButton />
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule('color', 'red');
        expect(tree).toMatchSnapshot();
    });
    it('is a styled-component', () => {
        expect(isStyledComponent(CloseButton)).toBe(true);
    });
    it('supports the as prop', () => {
        const testRenderer = TestRenderer.create(<CloseButton as="a" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('a');
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css, isStyledComponent } from 'styled-components';
import { Button } from '../../../index';
import { createTestTheme } from '../../../test/util';

describe('<Button>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<Button>Test button</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
    it('can render with theme', () => {
        const theme = createTestTheme({
            Button: css`
                color: red;
            `,
        });
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={theme}>
                <Button>Test button</Button>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule('color', 'red');
        expect(tree).toMatchSnapshot();
    });
    it('is a styled-component', () => {
        expect(isStyledComponent(Button)).toBe(true);
    });
    it('supports the as prop', () => {
        const testRenderer = TestRenderer.create(<Button as="a">Test button</Button>);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('a');
        expect(tree).toMatchSnapshot();
    });
});

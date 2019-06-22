import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css, isStyledComponent } from 'styled-components';
import { Button, withNamespace } from '../../../index';

describe('<Button>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<Button>Test button</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
    it('can render with theme', () => {
        const theme = withNamespace(
            {
                testTheme: {
                    Button: css`
                        color: red;
                    `,
                },
            },
            'testTheme'
        );
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

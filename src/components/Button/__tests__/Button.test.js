import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css } from 'styled-components';
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
});

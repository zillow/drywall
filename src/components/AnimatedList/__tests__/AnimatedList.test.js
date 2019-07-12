import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css, isStyledComponent } from 'styled-components';
import { AnimatedList } from '../../../index';
import { createTestTheme } from '../../../test/util';

describe('<AnimatedList>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(
            <AnimatedList>{['one', 'two', 'three']}</AnimatedList>
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    describe('without Object.entries', () => {
        const { entries } = global.Object;
        beforeEach(() => {
            delete global.Object.entries;
        });
        afterEach(() => {
            global.Object.entries = entries;
        });
        it('renders a static list when react-spring is not supported', () => {
            const testRenderer = TestRenderer.create(
                <AnimatedList>{['one', 'two', 'three']}</AnimatedList>
            );
            expect(testRenderer.toJSON()).toMatchSnapshot();
        });
    });

    it('can render with theme', () => {
        const theme = createTestTheme({
            AnimatedList: css`
                list-style: none;
            `,
        });
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={theme}>
                <AnimatedList>{['one', 'two', 'three']}</AnimatedList>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule('list-style', 'none');
        expect(tree).toMatchSnapshot();
    });

    it('is a styled-component', () => {
        expect(isStyledComponent(AnimatedList)).toBe(true);
    });
});

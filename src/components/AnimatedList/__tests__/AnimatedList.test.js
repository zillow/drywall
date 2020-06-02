import React from 'react';
import TestRenderer from 'react-test-renderer';
import { isStyledComponent } from 'styled-components';
import { AnimatedList } from '../../../index';

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

    it('is a styled-component', () => {
        expect(isStyledComponent(AnimatedList)).toBe(true);
    });
});

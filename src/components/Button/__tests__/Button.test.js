import React from 'react';
import TestRenderer from 'react-test-renderer';
import { isStyledComponent } from 'styled-components';
import { Button } from '../../../index';

describe('<Button>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<Button>Test button</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
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

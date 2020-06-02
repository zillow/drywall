import React from 'react';
import TestRenderer from 'react-test-renderer';
import { isStyledComponent } from 'styled-components';
import { CloseButton } from '../../../index';

describe('<CloseButton>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<CloseButton />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
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

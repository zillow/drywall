import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Button } from '../../../index';

describe('<Button>', () => {
    it('renders a default button', () => {
        const testRenderer = TestRenderer.create(<Button>Test button</Button>);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('button');
        expect(tree.props.role).toBeUndefined();
        expect(tree).toMatchSnapshot();
    });

    it('adds the button role for non-semantic elements', () => {
        const testRenderer = TestRenderer.create(<Button as="a">Test button</Button>);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('a');
        expect(tree.props.role).toBe('button');
        expect(tree).toMatchSnapshot();
    });
});

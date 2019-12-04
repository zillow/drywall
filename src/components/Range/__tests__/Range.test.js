import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Range } from '../../../index';

describe('<Range>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Range min="0" max="10" value="5" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('range');
        expect(tree.props.value).toBe('5');
        expect(tree.props.min).toBe('0');
        expect(tree.props.max).toBe('10');
        expect(tree.props.step).toBe('1');
        expect(tree).toMatchSnapshot();
    });
});

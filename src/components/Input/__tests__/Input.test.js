import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Input } from '../../../index';

describe('<Input>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Input value="test input" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('text');
        expect(tree.props.value).toBe('test input');
        expect(tree).toMatchSnapshot();
    });
});

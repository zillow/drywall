import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Radio } from '../../../index';

describe('<Radio>', () => {
    it('renders a default radio', () => {
        const testRenderer = TestRenderer.create(<Radio name="test-radio" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('radio');
        expect(tree.props.name).toBe('test-radio');
        expect(tree).toMatchSnapshot();
    });
});

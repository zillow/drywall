import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Checkbox } from '../../../index';

describe('<Checkbox>', () => {
    it('renders a default checkbox', () => {
        const testRenderer = TestRenderer.create(<Checkbox />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('checkbox');
        expect(tree).toMatchSnapshot();
    });
});

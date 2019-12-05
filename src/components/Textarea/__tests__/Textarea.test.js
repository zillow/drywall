import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Textarea } from '../../../index';

describe('<Textarea>', () => {
    it('renders a default textarea', () => {
        const testRenderer = TestRenderer.create(<Textarea value="Test text" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('textarea');
        expect(tree.props.value).toStrictEqual('Test text');
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Label } from '../../../index';

describe('<Label>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Label htmlFor="test-input">Test label</Label>);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('label');
        expect(tree.children).toStrictEqual(['Test label']);
        expect(tree.props.htmlFor).toBe('test-input');
        expect(tree).toMatchSnapshot();
    });
});

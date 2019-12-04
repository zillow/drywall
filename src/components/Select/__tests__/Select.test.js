import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Select } from '../../../index';

describe('<Select>', () => {
    it('renders a default select', () => {
        const testRenderer = TestRenderer.create(
            <Select>
                <option>Test option 1</option>
                <option>Test option 2</option>
                <option>Test option 3</option>
            </Select>
        );
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('select');
        expect(tree).toMatchSnapshot();
    });
});

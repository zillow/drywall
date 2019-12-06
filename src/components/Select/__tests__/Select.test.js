import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Select } from '../../../index';
import FieldContext from '../../../js/FieldContext';

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

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Select id="given-id">
                        <option>Test option 1</option>
                        <option>Test option 2</option>
                        <option>Test option 3</option>
                    </Select>
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Select>
                        <option>Test option 1</option>
                        <option>Test option 2</option>
                        <option>Test option 3</option>
                    </Select>
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(
                <Select>
                    <option>Test option 1</option>
                    <option>Test option 2</option>
                    <option>Test option 3</option>
                </Select>
            )).not.toThrow();
        });
    });
});

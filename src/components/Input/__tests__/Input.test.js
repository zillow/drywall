import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Input } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Input>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Input value="test input" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('text');
        expect(tree.props.value).toBe('test input');
        expect(tree).toMatchSnapshot();
    });

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Input id="given-id" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Input />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(<Input />)).not.toThrow();
        });
    });
});

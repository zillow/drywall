import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Radio } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Radio>', () => {
    it('renders a default radio', () => {
        const testRenderer = TestRenderer.create(<Radio name="test-radio" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('radio');
        expect(tree.props.name).toBe('test-radio');
        expect(tree).toMatchSnapshot();
    });

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Radio id="given-id" name="test-radio" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Radio name="test-radio" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(<Radio name="test-radio" />)).not.toThrow();
        });
    });
});

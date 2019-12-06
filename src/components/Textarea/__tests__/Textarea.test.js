import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Textarea } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Textarea>', () => {
    it('renders a default textarea', () => {
        const testRenderer = TestRenderer.create(<Textarea value="Test text" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('textarea');
        expect(tree.props.value).toStrictEqual('Test text');
        expect(tree).toMatchSnapshot();
    });

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Textarea id="given-id" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Textarea />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(<Textarea />)).not.toThrow();
        });
    });
});

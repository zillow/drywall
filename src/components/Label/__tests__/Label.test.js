import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Label } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Label>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Label htmlFor="test-input">Test label</Label>);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('label');
        expect(tree.children).toStrictEqual(['Test label']);
        expect(tree.props.htmlFor).toBe('test-input');
        expect(tree).toMatchSnapshot();
    });

    describe('FieldContext', () => {
        it('uses the given htmlFor if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Label htmlFor="given-id" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.htmlFor).toBe('given-id');
        });

        it('uses controlId if no htmlFor is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Label />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.htmlFor).toBe('context-id');
        });

        it('does not error if used outside of context without htmlFor', () => {
            expect(() => TestRenderer.create(<Label />)).not.toThrow();
        });
    });
});

import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Range } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Range>', () => {
    it('renders a default text input', () => {
        const testRenderer = TestRenderer.create(<Range min="0" max="10" value="5" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('range');
        expect(tree.props.value).toBe('5');
        expect(tree.props.min).toBe('0');
        expect(tree.props.max).toBe('10');
        expect(tree.props.step).toBe('1');
        expect(tree).toMatchSnapshot();
    });

    it('forwards ref', () => {
        const ref = React.createRef();
        TestRenderer.create(<Range min="0" max="10" ref={ref} />, {
            createNodeMock: () => 'node-mock',
        });
        expect(ref.current).toBe('node-mock');
    });

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Range id="given-id" min="0" max="10" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Range min="0" max="10" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(<Range min="0" max="10" />)).not.toThrow();
        });
    });
});

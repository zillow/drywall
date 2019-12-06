import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Checkbox } from '../../../index';
import FieldContext from '../../../js/FieldContext';

describe('<Checkbox>', () => {
    it('renders a default checkbox', () => {
        const testRenderer = TestRenderer.create(<Checkbox />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('input');
        expect(tree.props.type).toBe('checkbox');
        expect(tree).toMatchSnapshot();
    });

    it('forwards ref', () => {
        const ref = React.createRef();
        TestRenderer.create(<Checkbox ref={ref} />, {
            createNodeMock: () => 'node-mock',
        });
        expect(ref.current).toBe('node-mock');
    });

    describe('FieldContext', () => {
        it('uses the given id if provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Checkbox id="given-id" />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('given-id');
        });

        it('uses controlId if no id is provided', () => {
            const testRenderer = TestRenderer.create(
                <FieldContext.Provider value={{ controlId: 'context-id' }}>
                    <Checkbox />
                </FieldContext.Provider>
            );
            const tree = testRenderer.toJSON();
            expect(tree.props.id).toBe('context-id');
        });

        it('does not error if used outside of context without an id', () => {
            expect(() => TestRenderer.create(<Checkbox />)).not.toThrow();
        });
    });
});

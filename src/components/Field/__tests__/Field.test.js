import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Field } from '../../../index';
import FieldContext from '../../../js/FieldContext';
import { identifier } from '../../../js/identifier';

jest.mock('../../../js/identifier', () => ({
    identifier: jest.fn(() => 'mock-identifier'),
}));

describe('<Field>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a default field', () => {
        const testRenderer = TestRenderer.create(<Field />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('div');
        expect(tree).toMatchSnapshot();
    });

    it('renders a field as a different element', () => {
        const testRenderer = TestRenderer.create(<Field as="section" />);
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('section');
    });

    it('generates a new controlId', () => {
        const context = jest.fn();
        TestRenderer.create(
            <Field>
                <FieldContext.Consumer>{context}</FieldContext.Consumer>
            </Field>
        );
        expect(identifier).toBeCalledTimes(1);
        expect(context).toBeCalledTimes(1);
        expect(context).toHaveBeenLastCalledWith({
            controlId: 'mock-identifier',
        });
    });

    it('uses the given controlId', () => {
        const context = jest.fn();
        TestRenderer.create(
            <Field controlId="given-identifier">
                <FieldContext.Consumer>{context}</FieldContext.Consumer>
            </Field>
        );
        expect(identifier).not.toHaveBeenCalled();
        expect(context).toBeCalledTimes(1);
        expect(context).toHaveBeenLastCalledWith({
            controlId: 'given-identifier',
        });
    });
});

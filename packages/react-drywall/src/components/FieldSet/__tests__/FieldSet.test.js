import React from 'react';
import TestRenderer from 'react-test-renderer';
import { FieldSet } from '../../../index';

describe('<FieldSet>', () => {
    it('renders a default field set', () => {
        const testRenderer = TestRenderer.create(
            <FieldSet legend={<legend>test legend</legend>}>form controls</FieldSet>
        );
        const tree = testRenderer.toJSON();
        expect(tree.type).toBe('fieldset');
        const legend = tree.children[0];
        expect(legend.type).toBe('legend');
        expect(legend.children).toStrictEqual(['test legend']);
        expect(tree.children[1]).toBe('form controls');
        expect(tree).toMatchSnapshot();
    });

    it('forwards ref', () => {
        const ref = React.createRef();
        TestRenderer.create(
            <FieldSet legend={<legend>test legend</legend>} ref={ref}>
                form controls
            </FieldSet>,
            {
                createNodeMock: () => 'node-mock',
            }
        );
        expect(ref.current).toBe('node-mock');
    });
});

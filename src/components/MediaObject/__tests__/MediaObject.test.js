import React from 'react';
import TestRenderer from 'react-test-renderer';
import { isStyledComponent } from 'styled-components';
import { MediaObject } from '../../../index';

describe('<MediaObject>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<MediaObject media="media">body</MediaObject>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('is a styled-component', () => {
        expect(isStyledComponent(MediaObject)).toBe(true);
    });

    it('does not pass "media" prop through to DOM', () => {
        const testRenderer = TestRenderer.create(<MediaObject media="media">body</MediaObject>);
        const testInstance = testRenderer.root;
        const mediaObject = testInstance.findByType('div');
        expect(mediaObject.props.media).toBeUndefined();
    });

    it('does not pass "direction" prop through to DOM', () => {
        const testRenderer = TestRenderer.create(
            <MediaObject media="media" direction="column">
                body
            </MediaObject>
        );
        const testInstance = testRenderer.root;
        const mediaObject = testInstance.findByType('div');
        expect(mediaObject.props.direction).toBeUndefined();
    });

    it('does not pass unrecognized react props through to DOM', () => {
        const testRenderer = TestRenderer.create(
            <MediaObject media="media" data-foobar="baz" fooBar="baz">
                body
            </MediaObject>
        );
        const testInstance = testRenderer.root;
        const mediaObject = testInstance.findByType('div');
        expect(mediaObject.props['data-foobar']).toBe('baz');
        expect(mediaObject.props.fooBar).toBeUndefined();
    });

    it('customizes the layout with renderLayout render function', () => {
        const CustomLayout = () => <p>custom layout</p>;
        const testRenderer = TestRenderer.create(
            <MediaObject renderLayout={() => <CustomLayout />} />
        );
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(CustomLayout)).not.toThrow();
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('customizes the layout with renderLayout node', () => {
        const CustomLayout = () => <p>custom layout</p>;
        const testRenderer = TestRenderer.create(<MediaObject renderLayout={<CustomLayout />} />);
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(CustomLayout)).not.toThrow();
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});

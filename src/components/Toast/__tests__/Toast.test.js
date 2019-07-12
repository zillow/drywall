import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider, css, isStyledComponent } from 'styled-components';
import { Toast } from '../../../index';
import { createTestTheme } from '../../../test/util';

describe('<Toast>', () => {
    it('can render without theme', () => {
        const testRenderer = TestRenderer.create(<Toast body="Toast message" />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('can render with theme', () => {
        const theme = createTestTheme({
            Toast: css`
                color: red;
            `,
        });
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={theme}>
                <Toast body="Toast message" />
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule('color', 'red');
        expect(tree).toMatchSnapshot();
    });

    it('is a styled-component', () => {
        expect(isStyledComponent(Toast)).toBe(true);
    });

    it('does not render the action wrapper without the actionButton prop', () => {
        const testRenderer = TestRenderer.create(
            <Toast body="Toast message" actionButton={null} />
        );
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(Toast.Action)).toThrow('No instances found');
    });

    it('passes in a custom actionButton', () => {
        const CustomActionButton = () => <button type="button">custom close</button>;
        const testRenderer = TestRenderer.create(
            <Toast body="Toast message" actionButton={<CustomActionButton />} />
        );
        const testInstance = testRenderer.root;
        const action = testInstance.findByType(Toast.Action);
        expect(() => action.findByType(CustomActionButton)).not.toThrow();
    });

    it('appearance prop does not bleed to DOM', () => {
        const testRenderer = TestRenderer.create(<Toast body="Toast message" appearance="error" />);
        const testInstance = testRenderer.root;
        const toast = testInstance.findByType('div');
        expect(toast.props.appearance).toBeUndefined();
    });

    it('does not render the body wrapper without the body prop', () => {
        const testRenderer = TestRenderer.create(<Toast body={null} />);
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(Toast.Body)).toThrow('No instances found');
    });

    it('customizes the layout with a children render function', () => {
        const CustomLayout = () => <p>custom layout</p>;
        const testRenderer = TestRenderer.create(<Toast>{() => <CustomLayout />}</Toast>);
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(CustomLayout)).not.toThrow();
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('receives the enhanced icon content when using a render function', () => {
        const renderFn = jest.fn();
        const iconFn = jest.fn(() => 'icon content');
        TestRenderer.create(
            <Toast appearance="error" icon={iconFn}>
                {renderFn}
            </Toast>
        );

        // Validate that the iconFn was called with props
        expect(iconFn).toHaveBeenCalledTimes(1);
        expect(iconFn.mock.calls[0][0]).toMatchObject({
            appearance: 'error',
            children: renderFn,
        });

        // Validate the renderFn was called with the icon product
        expect(renderFn).toHaveBeenCalledTimes(1);
        expect(renderFn.mock.calls[0][0]).toMatchObject({
            appearance: 'error',
            icon: 'icon content',
        });
    });

    it('receives the enhanced closeButton content when using a render function', () => {
        const renderFn = jest.fn();
        const onClose = jest.fn();
        TestRenderer.create(<Toast onClose={onClose}>{renderFn}</Toast>);

        expect(renderFn).toHaveBeenCalledTimes(1);
        const { closeButton } = renderFn.mock.calls[0][0];
        expect(closeButton.props.onClick).toBe(onClose);
    });

    it('customizes the layout with a children render node', () => {
        const CustomLayout = () => <p>custom layout</p>;
        const testRenderer = TestRenderer.create(
            <Toast>
                <CustomLayout />
            </Toast>
        );
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(CustomLayout)).not.toThrow();
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('removes the default closeButton', () => {
        const testRenderer = TestRenderer.create(<Toast closeButton={null} />);
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(Toast.Close)).toThrow('No instances found');
    });

    it('removes the default closeButton when using a render function', () => {
        const renderFn = jest.fn();
        TestRenderer.create(<Toast closeButton={null}>{renderFn}</Toast>);

        const { closeButton } = renderFn.mock.calls[0][0];
        expect(closeButton).toBeNull();
    });

    it('does not render the header wrapper without the header prop', () => {
        const testRenderer = TestRenderer.create(<Toast header={null} />);
        const testInstance = testRenderer.root;
        expect(() => testInstance.findByType(Toast.Header)).toThrow('No instances found');
    });

    it('renders a header node', () => {
        const CustomHeader = () => <header>header</header>;
        const testRenderer = TestRenderer.create(<Toast header={<CustomHeader />} />);
        const testInstance = testRenderer.root;

        const header = testInstance.findByType(Toast.Header);
        expect(() => header.findByType(CustomHeader)).not.toThrow();
    });

    it('renders an icon node', () => {
        const CustomIcon = () => <i>icon</i>;
        const testRenderer = TestRenderer.create(<Toast icon={<CustomIcon />} />);
        const testInstance = testRenderer.root;

        const icon = testInstance.findByType(Toast.Icon);
        expect(() => icon.findByType(CustomIcon)).not.toThrow();
    });

    it('renders nothing when isOpen is false', () => {
        const testRenderer = TestRenderer.create(<Toast isOpen={false} />);
        expect(testRenderer.toJSON()).toBeNull();
    });

    it('passes the role value through to the DOM', () => {
        const testRenderer = TestRenderer.create(<Toast role="alert" />);
        const testInstance = testRenderer.root;
        const toast = testInstance.findByType('div');
        expect(toast.props.role).toBe('alert');
    });
});

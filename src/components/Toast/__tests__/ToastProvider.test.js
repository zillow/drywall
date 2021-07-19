import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { ToastProvider, withToast } from '../../../index';
import ToastQueue from '../../../js/ToastQueue';

jest.mock('react-dom', () => ({
    createPortal: jest.fn(node => node),
}));

jest.mock('../../../js/ToastQueue');

const getEventListenerCalls = (fn, type) => fn.mock.calls.filter(call => call[0] === type);

describe('<ToastProvider>', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // https://github.com/facebook/jest/issues/890#issuecomment-209698782
        Object.defineProperty(window, 'addEventListener', {
            writable: true,
            value: jest.fn(),
        });
        Object.defineProperty(window, 'removeEventListener', {
            writable: true,
            value: jest.fn(),
        });
    });

    it('provides enqueueToast context', () => {
        const Component = () => <div id="toast-component" />;
        const HOC = withToast(Component);
        const testRenderer = TestRenderer.create(
            <ToastProvider>
                <HOC />
            </ToastProvider>
        );
        const testInstance = testRenderer.root;
        const component = testInstance.findByType(Component);
        expect(typeof component.props.enqueueToast).toBe('function');

        component.props.enqueueToast('toast', 'options');
        const toastQueue = ToastQueue.mock.instances[0];
        expect(toastQueue.enqueue).toHaveBeenCalledTimes(1);
        expect(toastQueue.enqueue).toHaveBeenCalledWith('toast', 'options');
    });

    it('forwards refs with withToast', () => {
        const Component = React.forwardRef((props, ref) => <div ref={ref} id="toast-component" />);
        const HOC = withToast(Component);

        const ref = React.createRef();
        TestRenderer.create(
            <ToastProvider>
                <HOC ref={ref} />
            </ToastProvider>,
            {
                createNodeMock: el => {
                    if (el.props.id === 'toast-component') {
                        return 'toast-component-ref';
                    }
                    return 'other-ref';
                },
            }
        );

        expect(ref.current).toBe('toast-component-ref');
    });

    it('passes optionsFn to enqueue', () => {
        const optionsFn = jest.fn();
        const Component = () => <div id="toast-component" />;
        const HOC = withToast(Component);
        const testRenderer = TestRenderer.create(
            <ToastProvider optionsFn={optionsFn}>
                <HOC />
            </ToastProvider>
        );
        const testInstance = testRenderer.root;
        const component = testInstance.findByType(Component);
        expect(typeof component.props.enqueueToast).toBe('function');

        component.props.enqueueToast('toast');
        const toastQueue = ToastQueue.mock.instances[0];
        expect(toastQueue.enqueue).toHaveBeenCalledTimes(1);
        expect(toastQueue.enqueue).toHaveBeenCalledWith('toast', optionsFn);
    });

    it('renders children content', () => {
        const testRenderer = TestRenderer.create(
            <ToastProvider>
                <div id="toast-component" />
            </ToastProvider>
        );

        const testInstance = testRenderer.root;
        expect(() => testInstance.findByProps({ id: 'toast-component' })).not.toThrow();
    });

    it('passes duration configuration to ToastQueue', () => {
        TestRenderer.create(<ToastProvider duration={9999}>children</ToastProvider>);
        expect(ToastQueue).toHaveBeenCalledTimes(1);
        expect(ToastQueue.mock.calls[0][0]).toMatchObject({ duration: 9999 });
    });

    it('passes maxSize configuration to ToastQueue', () => {
        TestRenderer.create(<ToastProvider maxSize={5}>children</ToastProvider>);
        expect(ToastQueue).toHaveBeenCalledTimes(1);
        expect(ToastQueue.mock.calls[0][0]).toMatchObject({ maxSize: 5 });
    });

    it('passes arbitrary configuration to ToastQueue', () => {
        TestRenderer.create(<ToastProvider foo="bar">children</ToastProvider>);
        expect(ToastQueue).toHaveBeenCalledTimes(1);
        expect(ToastQueue.mock.calls[0][0]).toMatchObject({ foo: 'bar' });
    });

    it('creates a portal into the default body', () => {
        TestRenderer.create(<ToastProvider>children</ToastProvider>);

        expect(ReactDOM.createPortal).toHaveBeenCalledTimes(1);
        expect(ReactDOM.createPortal.mock.calls[0][1]).toBe(document.body);
    });

    it('creates a portal into the specified container', () => {
        const portal = 'portal';
        TestRenderer.create(<ToastProvider portal={portal}>children</ToastProvider>);

        expect(ReactDOM.createPortal).toHaveBeenCalledTimes(1);
        expect(ReactDOM.createPortal.mock.calls[0][1]).toBe(portal);
    });

    it('disabled portals', () => {
        TestRenderer.create(<ToastProvider portal={false}>children</ToastProvider>);

        expect(ReactDOM.createPortal).not.toHaveBeenCalled();
    });

    it('pauses on window blur', () => {
        TestRenderer.create(
            <ToastProvider pauseOnWindowBlur resumeOnWindowFocus={false}>
                children
            </ToastProvider>
        );

        const calls = getEventListenerCalls(window.addEventListener, 'blur');
        expect(calls).toHaveLength(1);
        const call = calls[0];
        expect(call[0]).toBe('blur');
        const onWindowBlur = call[1];

        const toastQueue = ToastQueue.mock.instances[0];
        expect(toastQueue.pauseAll).not.toHaveBeenCalled();

        onWindowBlur();
        expect(toastQueue.pauseAll).toHaveBeenCalledTimes(1);
    });

    it('resumes on window focus', () => {
        TestRenderer.create(
            <ToastProvider pauseOnWindowBlur={false} resumeOnWindowFocus>
                children
            </ToastProvider>
        );

        const calls = getEventListenerCalls(window.addEventListener, 'focus');
        expect(calls).toHaveLength(1);
        const call = calls[0];
        expect(call[0]).toBe('focus');
        const onWindowFocus = call[1];

        const toastQueue = ToastQueue.mock.instances[0];
        expect(toastQueue.resumeAll).not.toHaveBeenCalled();

        onWindowFocus();
        expect(toastQueue.resumeAll).toHaveBeenCalledTimes(1);
    });

    it('disables window events', () => {
        TestRenderer.create(
            <ToastProvider pauseOnWindowBlur={false} resumeOnWindowFocus={false}>
                children
            </ToastProvider>
        );

        expect(getEventListenerCalls(window.addEventListener, 'focus')).toHaveLength(0);
        expect(getEventListenerCalls(window.addEventListener, 'blur')).toHaveLength(0);
    });

    it('removes event listeners on unmount', () => {
        const testRenderer = TestRenderer.create(
            <ToastProvider pauseOnWindowBlur resumeOnWindowFocus>
                children
            </ToastProvider>
        );

        expect(getEventListenerCalls(window.removeEventListener, 'focus')).toHaveLength(0);
        expect(getEventListenerCalls(window.removeEventListener, 'blur')).toHaveLength(0);
        testRenderer.unmount();
        expect(getEventListenerCalls(window.removeEventListener, 'focus')).toHaveLength(1);
        expect(getEventListenerCalls(window.removeEventListener, 'blur')).toHaveLength(1);
    });

    it('subscribes to queue changes', () => {
        TestRenderer.create(<ToastProvider>children</ToastProvider>);

        const toastQueue = ToastQueue.mock.instances[0];
        expect(toastQueue.subscribe).toHaveBeenCalledTimes(1);
        expect(toastQueue.getState).not.toHaveBeenCalled();

        toastQueue.getState.mockImplementation(() => []);

        const onQueueChange = toastQueue.subscribe.mock.calls[0][0];
        onQueueChange();
        expect(toastQueue.getState).toHaveBeenCalledTimes(1);
    });

    it('enhances the toast components', () => {
        const testRenderer = TestRenderer.create(<ToastProvider>children</ToastProvider>);

        const dismiss = jest.fn();
        const toastQueue = ToastQueue.mock.instances[0];
        toastQueue.getState.mockImplementation(() => [
            {
                toastId: 'toast-id',
                value: <div id="test-toast" />,
                dismiss,
                pause: 'pause',
                resume: 'resume',
            },
        ]);

        const onQueueChange = toastQueue.subscribe.mock.calls[0][0];
        onQueueChange();

        const testInstance = testRenderer.root;
        const toast = testInstance.findByProps({ id: 'test-toast' });
        expect(toast.props).toStrictEqual({
            id: 'test-toast',
            onClose: dismiss,
            onMouseEnter: 'pause',
            onMouseLeave: 'resume',
        });
    });

    it('does not clobber toast onClose prop', () => {
        const testRenderer = TestRenderer.create(<ToastProvider>children</ToastProvider>);

        const dismiss = jest.fn();
        const onClose = jest.fn();
        const toastQueue = ToastQueue.mock.instances[0];
        toastQueue.getState.mockImplementation(() => [
            {
                toastId: 'toast-id',
                value: <div id="test-toast" onClose={onClose} />,
                dismiss,
                pause: 'pause',
                resume: 'resume',
            },
        ]);

        const onQueueChange = toastQueue.subscribe.mock.calls[0][0];
        onQueueChange();

        const testInstance = testRenderer.root;
        const toast = testInstance.findByProps({ id: 'test-toast' });
        expect(dismiss).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();

        // Close the toast
        toast.props.onClose();
        expect(dismiss).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('disables mouse over events on the toast', () => {
        const testRenderer = TestRenderer.create(
            <ToastProvider pauseOnMouseEnter={false} resumeOnMouseLeave={false}>
                children
            </ToastProvider>
        );

        const dismiss = jest.fn();
        const toastQueue = ToastQueue.mock.instances[0];
        toastQueue.getState.mockImplementation(() => [
            {
                toastId: 'toast-id',
                value: <div id="test-toast" />,
                dismiss,
                pause: 'pause',
                resume: 'resume',
            },
        ]);

        const onQueueChange = toastQueue.subscribe.mock.calls[0][0];
        onQueueChange();

        const testInstance = testRenderer.root;
        const toast = testInstance.findByProps({ id: 'test-toast' });
        expect(toast.props).toStrictEqual({
            id: 'test-toast',
            onClose: dismiss,
            onMouseEnter: undefined,
            onMouseLeave: undefined,
        });
    });

    it('unsubscribes on unmount', () => {
        const unsubscribe = jest.fn();

        ToastQueue.prototype.subscribe.mockImplementation(() => unsubscribe);

        const testRenderer = TestRenderer.create(<ToastProvider>children</ToastProvider>);

        expect(unsubscribe).not.toHaveBeenCalled();
        testRenderer.unmount();
        expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
});

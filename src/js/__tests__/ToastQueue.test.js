import FakeTimers from '@sinonjs/fake-timers';
import ToastQueue from '../ToastQueue';

describe('ToastQueue', () => {
    let clock;

    beforeEach(() => {
        clock = FakeTimers.install();
    });

    afterEach(() => {
        clock.uninstall();
    });

    function expectQueueToBeEmpty(queue) {
        expect(queue.getState()).toStrictEqual([]);

        // Validate internal state
        expect(queue.activeIds).toStrictEqual([]);
        expect(queue.pendingIds).toStrictEqual([]);
        expect(queue.toasts).toStrictEqual({});
    }

    it('enqueues a toast', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);
    });

    it('enqueues a toast with a value callback', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const toast = jest.fn(() => 'foo');
        queue.enqueue(toast);
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);
        expect(toast).toHaveBeenCalledTimes(1);

        const calledWith = toast.mock.calls[0][0];
        expect(calledWith.toastId).toBe(1);
        expect(typeof calledWith.dismiss).toBe('function');
        expect(typeof calledWith.pause).toBe('function');
        expect(typeof calledWith.resume).toBe('function');
    });

    it('enqueues a toast with an options callback', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const options = jest.fn();
        queue.enqueue('foo', options);
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);
        expect(options).toHaveBeenCalledTimes(1);
        expect(options).toHaveBeenCalledWith('foo');
    });

    it('enqueues multiple toasts', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);
    });

    it('unsubscribes', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        const unsubscribe = queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        unsubscribe();
        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);
    });

    it('dismisses a toast', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const foo = queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        const bar = queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        foo.dismiss();
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 2,
                value: 'bar',
            },
        ]);
        expect(queue.toasts[1]).toBeUndefined();

        bar.dismiss();
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    it('only notifies if dismiss is successful', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const foo = queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        foo.dismiss();
        expect(subscription).toHaveBeenCalledTimes(2);
        expectQueueToBeEmpty(queue);

        foo.dismiss();
        expect(subscription).toHaveBeenCalledTimes(2);
    });

    it('dismisses all', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        queue.dismissAll();
        expect(subscription).toHaveBeenCalledTimes(3);
        expectQueueToBeEmpty(queue);
    });

    it('does not notify with dismiss all if there is nothing to dismiss', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.dismissAll();
        expect(subscription).not.toHaveBeenCalled();
    });

    it('dismisses after duration', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(3000);
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(2000);
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    it('sets a custom duration', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        queue.enqueue('bar', { duration: 1000 });
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(1000);
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    it('pauses a toast', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const foo = queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        foo.pause();
        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(5000);
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        foo.resume();
        clock.tick(3000);
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    it('pauses then resumes then pauses again', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const foo = queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        foo.pause();

        clock.tick(3000);
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        foo.resume();
        clock.tick(2999);
        foo.pause();
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(9999);
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        foo.resume();
        clock.tick(1);
        expect(subscription).toHaveBeenCalledTimes(2);
        expectQueueToBeEmpty(queue);
    });

    it('does not error when calling functions after dismissed', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        const foo = queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        foo.dismiss();
        expect(foo.pause).not.toThrow();
        expect(foo.resume).not.toThrow();
        expect(foo.dismiss).not.toThrow();
    });

    it('pauses all', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(2000);
        queue.pauseAll();
        clock.tick(99999);
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        queue.resumeAll();
        clock.tick(1000);
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(2000);
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    it('has no max size', () => {
        const queue = new ToastQueue({ maxSize: false });

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);

        expect(queue.getState()).toMatchObject([
            {
                toastId: 0,
                value: 1,
            },
            {
                toastId: 1,
                value: 2,
            },
            {
                toastId: 2,
                value: 3,
            },
            {
                toastId: 3,
                value: 4,
            },
            {
                toastId: 4,
                value: 5,
            },
        ]);
    });

    it('has no duration and must be manually dismissed', () => {
        const queue = new ToastQueue({ duration: false });

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(999999);
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);
    });

    it('new toasts do not start when in a paused state', () => {
        const queue = new ToastQueue();

        const subscription = jest.fn();
        queue.subscribe(subscription);

        queue.enqueue('foo');
        expect(subscription).toHaveBeenCalledTimes(1);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
        ]);

        clock.tick(2000);
        queue.pauseAll();
        queue.enqueue('bar');
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(99999);
        expect(subscription).toHaveBeenCalledTimes(2);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 1,
                value: 'foo',
            },
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        queue.resumeAll();
        clock.tick(3000);
        expect(subscription).toHaveBeenCalledTimes(3);
        expect(queue.getState()).toMatchObject([
            {
                toastId: 2,
                value: 'bar',
            },
        ]);

        clock.tick(2000);
        expect(subscription).toHaveBeenCalledTimes(4);
        expectQueueToBeEmpty(queue);
    });

    describe('pending toasts', () => {
        it('enqueues multiple toasts', () => {
            const queue = new ToastQueue({ maxSize: 1 });

            const subscription = jest.fn();
            queue.subscribe(subscription);

            queue.enqueue('foo');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            queue.enqueue('bar');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);
        });

        it('dismisses toasts', () => {
            const queue = new ToastQueue({ maxSize: 1 });

            const subscription = jest.fn();
            queue.subscribe(subscription);

            const foo = queue.enqueue('foo');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            queue.enqueue('bar');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            foo.dismiss();
            expect(subscription).toHaveBeenCalledTimes(2);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 2,
                    value: 'bar',
                },
            ]);
        });

        it('dismisses a pending toast', () => {
            const queue = new ToastQueue({ maxSize: 1 });

            const subscription = jest.fn();
            queue.subscribe(subscription);

            const foo = queue.enqueue('foo');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            const bar = queue.enqueue('bar');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            bar.dismiss();
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            foo.dismiss();
            expect(subscription).toHaveBeenCalledTimes(2);
            expectQueueToBeEmpty(queue);
        });

        it('dismisses all with pending toasts', () => {
            const queue = new ToastQueue({ maxSize: 1 });

            const subscription = jest.fn();
            queue.subscribe(subscription);

            queue.enqueue('foo');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            queue.enqueue('bar');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            queue.dismissAll();
            expect(subscription).toHaveBeenCalledTimes(2);
            expectQueueToBeEmpty(queue);
        });

        it('pauses the first and lets the second get replaced', () => {
            const queue = new ToastQueue({ maxSize: 2 });

            const subscription = jest.fn();
            queue.subscribe(subscription);

            const foo = queue.enqueue('foo');
            expect(subscription).toHaveBeenCalledTimes(1);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
            ]);

            clock.tick(2000);
            foo.pause();
            queue.enqueue('bar');
            expect(subscription).toHaveBeenCalledTimes(2);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
                {
                    toastId: 2,
                    value: 'bar',
                },
            ]);

            clock.tick(3000);
            queue.enqueue('baz');
            expect(subscription).toHaveBeenCalledTimes(2);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
                {
                    toastId: 2,
                    value: 'bar',
                },
            ]);

            clock.tick(2000);
            foo.resume();
            expect(subscription).toHaveBeenCalledTimes(3);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 1,
                    value: 'foo',
                },
                {
                    toastId: 3,
                    value: 'baz',
                },
            ]);

            clock.tick(3000);
            expect(subscription).toHaveBeenCalledTimes(4);
            expect(queue.getState()).toMatchObject([
                {
                    toastId: 3,
                    value: 'baz',
                },
            ]);

            clock.tick(2000);
            expect(subscription).toHaveBeenCalledTimes(5);
            expectQueueToBeEmpty(queue);
        });
    });
});

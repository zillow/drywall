class ToastQueue {
    id = -1;

    activeIds = [];

    pendingIds = [];

    subscriptions = {};

    toasts = {};

    constructor(opts) {
        this.opts = {
            maxSize: 3,
            duration: 5000,
            ...opts,
        };
    }

    subscribe(fn) {
        this.id += 1;
        const subscriptionId = this.id;
        this.subscriptions[subscriptionId] = fn;
        return this.unsubscribe.bind(this, subscriptionId);
    }

    unsubscribe(subscriptionId) {
        delete this.subscriptions[subscriptionId];
    }

    getState() {
        return this.activeIds.map(id => this.toasts[id]);
    }

    notify() {
        Object.keys(this.subscriptions).forEach(subscriptionId =>
            this.subscriptions[subscriptionId]()
        );
    }

    refresh() {
        let refreshed = false;
        while (this.activeIds.length < (this.opts.maxSize || Infinity) && this.pendingIds.length) {
            const toastId = this.pendingIds.shift();
            this.resume(toastId);
            this.activeIds.push(toastId);
            refreshed = true;
        }
        if (refreshed) {
            this.notify();
        }
        return refreshed;
    }

    enqueue(value, opts) {
        this.id += 1;
        const toastId = this.id;
        const toast = {
            toastId,
            dismiss: this.dismiss.bind(this, toastId),
            pause: this.pause.bind(this, toastId),
            resume: this.resume.bind(this, toastId),
        };

        let toastValue = value;
        if (typeof value === 'function') {
            toastValue = value(toast);
        }
        toast.value = toastValue;

        let toastOptions = opts;
        if (typeof opts === 'function') {
            toastOptions = opts(toastValue);
        }
        toast.opts = {
            ...this.opts,
            ...toastOptions,
        };

        this.toasts[toastId] = toast;
        this.pendingIds.push(toastId);
        this.refresh();
        return toast;
    }

    dismiss(toastId) {
        let activeRemoved = false;
        const activeIndex = this.activeIds.indexOf(toastId);
        if (activeIndex >= 0) {
            this.activeIds.splice(activeIndex, 1);
            activeRemoved = true;
        }

        const pendingIndex = this.pendingIds.indexOf(toastId);
        if (pendingIndex >= 0) {
            this.pendingIds.splice(pendingIndex, 1);
        }

        delete this.toasts[toastId];
        if (!this.refresh() && activeRemoved) {
            this.notify();
        }
    }

    dismissAll() {
        if (this.activeIds.length) {
            this.activeIds = [];
            this.pendingIds = [];
            this.toasts = {};
            this.notify();
        }
    }

    pause(toastId) {
        const toast = this.toasts[toastId];
        if (!toast || !toast.timeout) {
            return;
        }

        clearTimeout(toast.timeout);
        delete toast.timeout;
        toast.ellapsed += Date.now() - toast.start;
    }

    pauseAll() {
        this.paused = true;
        this.activeIds.forEach(toastId => this.toasts[toastId].pause());
    }

    resume(toastId) {
        const toast = this.toasts[toastId];
        if (this.paused || !toast || toast.timeout) {
            return;
        }

        if (toast.opts.duration) {
            toast.ellapsed = toast.ellapsed || 0;
            toast.start = Date.now();
            toast.timeout = setTimeout(toast.dismiss, toast.opts.duration - toast.ellapsed);
        }
    }

    resumeAll() {
        this.paused = false;
        this.activeIds.forEach(toastId => this.toasts[toastId].resume());
    }
}

export default ToastQueue;

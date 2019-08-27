export const log = (message, level = 'warn') => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console[level](message);
    }
};

export const logDeprecation = message => {
    log(`[Deprecation] ${message}`);
};

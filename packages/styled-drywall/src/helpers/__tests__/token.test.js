import { token } from '../token';

describe('token helper', () => {
    it('returns a function', () => {
        const fn = token('foo');
        expect(typeof fn).toBe('function');
    });

    it('accesses a top level property', () => {
        const props = {
            theme: {
                foo: 'FOO',
                bar: 'BAR',
            },
        };
        expect(token('foo')(props)).toBe('FOO');
    });

    it('accesses a nested property', () => {
        const props = {
            theme: {
                foo: {
                    bar: 'BAR',
                },
            },
        };
        expect(token('foo.bar')(props)).toBe('BAR');
    });

    it('accesses a nested array property', () => {
        const props = {
            theme: {
                foo: {
                    bars: ['bar0', 'bar1', 'bar2'],
                },
            },
        };
        expect(token('foo.bars[1]')(props)).toBe('bar1');
    });

    it('accesses an object from an array', () => {
        const props = {
            theme: {
                foo: {
                    bars: ['bar0', { baz: 'BAZ' }, 'bar2'],
                },
            },
        };
        expect(token('foo.bars[1].baz')(props)).toBe('BAZ');
    });

    it('fails gracefully when accessing an inaccessible nested property', () => {
        const props = {
            theme: {
                foo: 'FOO',
            },
        };
        expect(token('foo.bar.baz')(props)).toBeUndefined();
    });

    it('fails gracefully when there is no theme prop', () => {
        const props = {};
        expect(token('foo')(props)).toBeUndefined();
    });

    it('defines a namespace on the theme with DRYWALL_NAMESPACE', () => {
        const props = {
            theme: {
                DRYWALL_NAMESPACE: 'myNamespace',
                myNamespace: {
                    foo: 'FOO',
                },
            },
        };
        expect(token('foo')(props)).toBe('FOO');
    });

    it('accesses a property using the namespace option', () => {
        const props = {
            theme: {
                myNamespace: {
                    foo: 'FOO',
                },
            },
        };
        expect(token('foo', 'myNamespace')(props)).toBe('FOO');
    });

    it('uses the namespace option over the DRYWALL_NAMESPACE value', () => {
        const props = {
            theme: {
                DRYWALL_NAMESPACE: 'myOtherNamespace',
                myNamespace: {
                    foo: 'FOO',
                },
                myOtherNamespace: {
                    foo: 'BAR',
                },
            },
        };
        expect(token('foo', 'myNamespace')(props)).toBe('FOO');
    });

    it('sets namespace to empty string to override DRYWALL_NAMESPACE', () => {
        const props = {
            theme: {
                DRYWALL_NAMESPACE: 'myOtherNamespace',
                myOtherNamespace: {
                    foo: 'BAR',
                },
                foo: 'FOO',
            },
        };
        expect(token('foo', '')(props)).toBe('FOO');
    });

    it('sets namespace to false to override DRYWALL_NAMESPACE', () => {
        const props = {
            theme: {
                DRYWALL_NAMESPACE: 'myOtherNamespace',
                myOtherNamespace: {
                    foo: 'BAR',
                },
                foo: 'FOO',
            },
        };
        expect(token('foo', false)(props)).toBe('FOO');
    });

    it('uses DRYWALL_NAMESPACE when namespace is undefined', () => {
        const props = {
            theme: {
                DRYWALL_NAMESPACE: 'myOtherNamespace',
                myOtherNamespace: {
                    foo: 'BAR',
                },
                foo: 'FOO',
            },
        };
        expect(token('foo', undefined)(props)).toBe('BAR');
    });

    it('tries to access namespace when there is no theme', () => {
        const props = {};
        expect(token('foo', 'myNamespace')(props)).toBeUndefined();
    });
});

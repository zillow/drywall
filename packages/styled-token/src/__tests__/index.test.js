import token from '..';

describe('token', () => {
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

    describe('namespacing', () => {
        it('defines a namespace on the theme with NAMESPACE', () => {
            const props = {
                theme: {
                    NAMESPACE: 'myNamespace',
                    myNamespace: {
                        foo: 'FOO',
                    },
                },
            };
            expect(token('foo')(props)).toBe('FOO');
        });

        it('accesses a property using options.namespace', () => {
            const props = {
                theme: {
                    myNamespace: {
                        foo: 'FOO',
                    },
                },
            };
            expect(token('foo', { namespace: 'myNamespace' })(props)).toBe('FOO');
        });

        it('options.namespace overrides NAMESPACE', () => {
            const props = {
                theme: {
                    NAMESPACE: 'myOtherNamespace',
                    myNamespace: {
                        foo: 'FOO',
                    },
                    myOtherNamespace: {
                        foo: 'BAR',
                    },
                },
            };
            expect(token('foo', { namespace: 'myNamespace' })(props)).toBe('FOO');
        });

        it('removes NAMESPACE with empty options.namespace', () => {
            const props = {
                theme: {
                    NAMESPACE: 'myOtherNamespace',
                    myOtherNamespace: {
                        foo: 'BAR',
                    },
                    foo: 'FOO',
                },
            };
            expect(token('foo', { namespace: '' })(props)).toBe('FOO');
        });

        it('tries to access namespace when there is no theme', () => {
            const props = {};
            expect(token('foo', { namespace: 'myNamespace' })(props)).toBeUndefined();
        });
    });

    describe('callbacks', () => {
        it('uses a callback without options', () => {
            const props = {
                theme: {
                    sizes: {
                        sm: 8,
                        md: 16,
                        lg: 24,
                    },
                },
            };
            expect(token('sizes.md', t => t * 2)(props)).toBe(32);
        });

        it('uses a callback with options', () => {
            const props = {
                theme: {
                    sizes: {
                        sm: 8,
                        md: 16,
                        lg: 24,
                    },
                },
            };
            expect(token('sm', { namespace: 'sizes' }, t => t * 2)(props)).toBe(16);
        });
    });

    describe('fallbacks', () => {
        it('uses an array for token fallbacks', () => {
            const props = {
                theme: {
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(token(['colors.darkblue', 'colors.blue', 'colors.lightblue'])(props)).toBe(
                '#blue'
            );
        });

        it('returns undefined if no tokens in array found', () => {
            const props = {
                theme: {
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(
                token(['colors.darkblue', 'colors.darkerblue', 'colors.darkestblue'])(props)
            ).toBeUndefined();
        });

        it('uses options.defaultValue for a value fallback', () => {
            const props = {};
            expect(token('missing', { defaultValue: 'default' })(props)).toBe('default');
        });

        it('uses both array and options.defaultValue fallbacks', () => {
            const props = {
                theme: {
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(
                token(['colors.darkblue', 'colors.darkerblue', 'colors.darkestblue'], {
                    defaultValue: '#fallbackblue',
                })(props)
            ).toBe('#fallbackblue');
        });
    });
});

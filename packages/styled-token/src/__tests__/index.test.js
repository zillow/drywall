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

    it('has a hyphen in the path', () => {
        const props = {
            theme: {
                foo: {
                    'bar-baz': 'BARBAZ',
                },
            },
        };
        expect(token('foo.bar-baz')(props)).toBe('BARBAZ');
    });

    it('has a period in the path segment key', () => {
        const props = {
            theme: {
                foo: {
                    'bar.baz': 'BARBAZ',
                },
            },
        };
        expect(token('foo.bar.baz')(props)).toBeUndefined();
    });

    it('uses bracket notation for accessing an object property', () => {
        const props = {
            theme: {
                foo: {
                    'bar.baz': 'BARBAZ',
                },
            },
        };
        expect(token('foo["bar.baz"]')(props)).toBe('BARBAZ');
    });

    it('tries to pull a property when the object key is an empty string', () => {
        const props = {
            theme: {
                foo: {
                    '': {
                        bar: 'emptybar',
                    },
                },
            },
        };
        expect(token('foo[""].bar')(props)).toBe('emptybar');
    });

    it('throws an error with an unsupported path type', () => {
        const props = {};
        expect(() => {
            token(() => {})(props);
        }).toThrow('`path` should be one of `string`, `array`, `object`');
    });

    it('uses a global defaultValue option', () => {
        const props = {
            theme: {
                STYLED_TOKEN: {
                    defaultValue: 'global default',
                },
            },
        };
        expect(token('missing')(props)).toBe('global default');
    });

    it('overrides a global defaultValue option', () => {
        const props = {
            theme: {
                STYLED_TOKEN: {
                    defaultValue: 'global default',
                },
            },
        };
        expect(token('missing', { defaultValue: 'default' })(props)).toBe('default');
    });

    describe('caching', () => {
        it('does not use caching by default', () => {
            const props = {
                theme: {
                    foo: 'FOO',
                },
            };
            expect(token('foo')(props)).toBe('FOO');
            props.theme.foo = 'BAR';
            // Should return 'BAR' since the cache is disabled
            expect(token('foo', { caching: false })(props)).toBe('BAR');
        });

        it('enables global caching', () => {
            const props = {
                theme: {
                    STYLED_TOKEN: {
                        caching: true,
                    },
                    foo: 'FOO',
                },
            };
            expect(token('foo')(props)).toBe('FOO');
            props.theme.foo = 'BAR';
            // Should still return 'FOO' from cache since the theme object is the same
            expect(token('foo')(props)).toBe('FOO');
        });

        it('overrides global caching', () => {
            const props = {
                theme: {
                    STYLED_TOKEN: {
                        caching: true,
                    },
                    foo: 'FOO',
                },
            };
            expect(token('foo')(props)).toBe('FOO');
            props.theme.foo = 'BAR';
            // Should return 'BAR' since the cache is disabled
            expect(token('foo', { caching: false })(props)).toBe('BAR');
        });

        it('uses a different cache for each theme', () => {
            const props = {
                theme: {
                    STYLED_TOKEN: {
                        caching: true,
                    },
                    foo: 'FOO',
                },
            };
            expect(token('foo')(props)).toBe('FOO');
            props.theme = {
                foo: 'BAR',
            };
            // Should return 'BAR' since the theme object changed
            expect(token('foo')(props)).toBe('BAR');
        });
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

        it('only passes one argument to the callback', () => {
            const props = {};
            token('sizes.md', (...args) => {
                expect(args).toHaveLength(1);
            })(props);
        });
    });

    describe('array syntax', () => {
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

        it('passes the derived value and an array of values to the callback', () => {
            const props = {
                theme: {
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(
                token(['colors.darkblue', 'colors.blue', 'colors.lightblue'], (value, values) => {
                    expect(value).toBe('#blue');
                    expect(values).toStrictEqual([undefined, '#blue', '#lightblue']);
                    return '#red';
                })(props)
            ).toBe('#red');
        });
    });

    describe('object syntax', () => {
        it('throws an error when no callback is provided', () => {
            const props = {};
            expect(() => {
                token({
                    borderColor: ['colors.darkblue', 'colors.blue', 'colors.lightblue'],
                    borderWidth: 'borders.width',
                    borderStyle: 'borders.style',
                })(props);
            }).toThrow('`callback` is required when `path` is an `object`');
        });

        it('passes the map of values to the callback', () => {
            const props = {
                theme: {
                    borders: {
                        width: '1px',
                        style: 'solid',
                    },
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(
                token(
                    {
                        borderColor: 'colors.blue',
                        borderWidth: 'borders.width',
                        borderStyle: 'borders.style',
                    },
                    values => {
                        expect(values).toStrictEqual({
                            borderColor: '#blue',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        });

                        return `${values.borderWidth} ${values.borderStyle} ${values.borderColor}`;
                    }
                )(props)
            ).toBe('1px solid #blue');
        });

        it('uses a fallback array in the object map', () => {
            const props = {
                theme: {
                    borders: {
                        width: '1px',
                        style: 'solid',
                    },
                    colors: {
                        blue: '#blue',
                        lightblue: '#lightblue',
                    },
                },
            };
            expect(
                token(
                    {
                        borderColor: ['colors.darkblue', 'colors.blue', 'colors.lightblue'],
                        borderWidth: 'borders.width',
                        borderStyle: 'borders.style',
                    },
                    values => {
                        expect(values).toStrictEqual({
                            borderColor: '#blue',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        });

                        return `${values.borderWidth} ${values.borderStyle} ${values.borderColor}`;
                    }
                )(props)
            ).toBe('1px solid #blue');
        });

        it('only passes one argument to the callback', () => {
            const props = {};
            token(
                {
                    color: 'colors.blue',
                },
                (...args) => {
                    expect(args).toHaveLength(1);
                }
            )(props);
        });
    });
});

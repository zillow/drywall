import { withNamespace } from '../../index';

describe('withNamespace', () => {
    it('builds a namespaced theme object', () => {
        const Component = {};
        const testTheme = withNamespace(
            {
                testTheme: {
                    Component,
                },
            },
            'testTheme'
        );

        expect(testTheme.ns().Component).toBe(Component);
    });

    it('returns an empty theme for missing namespace', () => {
        const Component = {};
        const testTheme = withNamespace(
            {
                testTheme: {
                    Component,
                },
            },
            'missingNamespace'
        );

        expect(testTheme.ns().Component).toBeUndefined();
    });

    it('changing the namespace finds the component', () => {
        const Component = {};
        const testTheme = withNamespace(
            {
                testTheme: {
                    Component,
                },
            },
            'missingNamespace'
        );

        testTheme.NAMESPACE = 'testTheme';
        expect(testTheme.ns().Component).toBe(Component);
    });
});

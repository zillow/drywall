import { stringToPath } from '../stringToPath';

describe('stringToPath', () => {
    it('parses dot path', () => {
        expect(stringToPath('foo.bar.baz')).toStrictEqual(['foo', 'bar', 'baz']);
    });

    it('parses array path', () => {
        expect(stringToPath('foo[3].bar[2].baz')).toStrictEqual(['foo', '3', 'bar', '2', 'baz']);
    });

    it('parses array access to object with double quotes', () => {
        expect(stringToPath('foo["bar"].baz')).toStrictEqual(['foo', 'bar', 'baz']);
    });

    it('parses array access to object with single quotes', () => {
        expect(stringToPath(`foo['bar'].baz`)).toStrictEqual(['foo', 'bar', 'baz']);
    });

    it('parses array access to object with a period in the property', () => {
        expect(stringToPath(`foo['bar.baz'].bat`)).toStrictEqual(['foo', 'bar.baz', 'bat']);
    });

    it('parses an empty string key', () => {
        expect(stringToPath(`foo[''].bat`)).toStrictEqual(['foo', '', 'bat']);
    });
});

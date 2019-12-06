import { identifier } from '../identifier';

describe('identifier', () => {
    it('generates a new id', () => {
        const foo = identifier();
        const bar = identifier();
        expect(foo).not.toBe(bar);
    });
});

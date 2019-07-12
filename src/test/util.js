import { withNamespace } from '../index';

// eslint-disable-next-line zillow/import/prefer-default-export
export const createTestTheme = theme =>
    withNamespace(
        {
            testTheme: { ...theme },
        },
        'testTheme'
    );

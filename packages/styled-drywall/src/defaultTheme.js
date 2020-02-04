const defaultTheme = {
    borders: ['1px'],
    colors: {
        black: '#000',
        grays: [
            '#f8f9fa',
            '#e9ecef',
            '#dee2e6',
            '#ced4da',
            '#adb5bd',
            '#6c757d',
            '#495057',
            '#343a40',
            '#212529',
        ],
        white: '#fff',
        blue: '#0d6efd',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#d63384',
        red: '#dc3545',
        orange: '#fd7e14',
        yellow: '#ffc107',
        green: '#28a745',
        teal: '#20c997',
        cyan: '#17a2b8',
    },
    fonts: {
        'sans-serif':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        'monospace':
            'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSizes: ['.5rem', '.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem'],
    fontWeights: ['lighter', 300, 400, 700, 'bolder'],
    radii: {
        default: '0.25rem',
        pill: '999px',
        oval: '50%',
    },
    space: [0, '0.5rem', '1rem', '1.5rem', '2rem', '2.5rem'],
};

defaultTheme.Buttons = {
    padding: defaultTheme.space[2],
    borderWidth: defaultTheme.borders[0],
    borderColor: defaultTheme.colors.blue,
    backgroundColor: defaultTheme.colors.blue,
    color: defaultTheme.colors.white,
    borderRadius: defaultTheme.radii.default,
    fontSize: defaultTheme.fontSizes[2],
    fontFamily: defaultTheme.fonts['sans-serif'],
};

defaultTheme.Inputs = {
    padding: defaultTheme.space[2],
    backgroundColor: defaultTheme.colors.white,
    color: defaultTheme.colors.black,
    borderWidth: defaultTheme.borders[0],
    borderColor: defaultTheme.colors.grays[4],
    borderRadius: defaultTheme.radii.default,
    fontSize: defaultTheme.fontSizes[2],
    fontFamily: defaultTheme.fonts['sans-serif'],
};

export { defaultTheme };

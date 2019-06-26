All styles in drywall come from a theme object that is passed down to components via the [`ThemeProvider`](https://www.styled-components.com/docs/api#themeprovider) component.
Wrap your application in the component, and pass it your theme to see your library come to life!

```jsx static
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeBoostrap } from 'drywall-theme-bootstrap';
import { Button } from 'drywall';

ReactDOM.render(
    <ThemeProvider theme={ThemeBootstrap}>
        <Button>Bootstrap button</Button>
    </ThemeProvider>,
    document.getElementById('root')
);
```

If you're not interested in building a theme yourself, check out our [example theme](https://zillow.github.io/drywall-theme-bootstrap/) based on the [Bootstrap](https://getbootstrap.com/) UI system.
If you are interested, keep reading!

At the simplest level, a theme is just a plain javascript object consisting of many [styled-components `css` objects](https://www.styled-components.com/docs/api#css).
Drywall components know how to pull their corresponding styles from the theme object through the convention, `theme.namespace.Component`.
For example, `Button` styles for the bootstrap example theme will always live at `theme.bootstrap.Button`.
There is some additional functionality supporting namespacing, but for now, just make sure to wrap your theme with the `withNamespace` function:

```jsx static
import { withNamespace } from 'drywall';
import { css } from 'styled-components';

const CustomTheme = {
    CustomTheme: {
        Button: css`
            color: blue;
        `
    }
};

export default withNamespace(CustomTheme, 'CustomTheme');
```

Other than the location of the top level component css objects, drywall makes no assumptions about what your theme object looks like.
Feel free to add design tokens and other shared functionality to the theme as you please.

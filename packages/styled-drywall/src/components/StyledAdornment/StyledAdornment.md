Left:

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';

<ThemeProvider theme={defaultTheme}>
    <StyledAdornment>$</StyledAdornment>
</ThemeProvider>
```

Right:

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';

<ThemeProvider theme={defaultTheme}>
    <StyledAdornment position="right">/month</StyledAdornment>
</ThemeProvider>
```

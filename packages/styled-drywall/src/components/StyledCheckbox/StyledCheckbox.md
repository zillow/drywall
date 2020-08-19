```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';

<ThemeProvider theme={defaultTheme}>
    <StyledCheckbox />
    <StyledCheckbox defaultChecked />
</ThemeProvider>
```
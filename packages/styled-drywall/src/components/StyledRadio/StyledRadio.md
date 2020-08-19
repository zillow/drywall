```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';

<ThemeProvider theme={defaultTheme}>
    <StyledRadio name="StyledRadio-example" />
    <StyledRadio name="StyledRadio-example" defaultChecked />
</ThemeProvider>
```
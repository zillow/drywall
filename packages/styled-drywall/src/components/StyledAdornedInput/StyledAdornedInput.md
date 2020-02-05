```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledInput, StyledAdornment } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledAdornedInput
        leftAdornment={<StyledAdornment>$</StyledAdornment>}
        input={<StyledInput placeholder="Placeholder text" />}
        rightAdornment={<StyledAdornment>/month</StyledAdornment>}
    />
</ThemeProvider>
```
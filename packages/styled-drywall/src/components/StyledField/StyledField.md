[`StyledCheckbox`](#styledcheckbox):

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledCheckbox, StyledLabel } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledField direction="row">
        <StyledCheckbox defaultChecked />
        <StyledLabel>Checkbox label</StyledLabel>
    </StyledField>
</ThemeProvider>
```

[`StyledInput`](#styledinput):

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledInput, StyledLabel } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledField>
        <StyledLabel>Input label</StyledLabel>
        <StyledInput placeholder="Placeholder text" />
    </StyledField>
</ThemeProvider>
```

[`StyledRadio`](#styledradio):

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledRadio, StyledLabel } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledField direction="row">
        <StyledRadio defaultChecked name="StyledField-radio-example" />
        <StyledLabel>Radio label</StyledLabel>
    </StyledField>
</ThemeProvider>
```

[`StyledSelect`](#styledselect):

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledSelect, StyledLabel } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledField>
        <StyledLabel>Select label</StyledLabel>
        <StyledSelect>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </StyledSelect>
    </StyledField>
</ThemeProvider>
```

[`StyledTextarea`](#styledtextarea):

```jsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../defaultTheme';
import { StyledTextarea, StyledLabel } from '../../index';

<ThemeProvider theme={defaultTheme}>
    <StyledField>
        <StyledLabel>Textarea label</StyledLabel>
        <StyledTextarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
    </StyledField>
</ThemeProvider>
```

# styled-token

A small helper function (similar to lodash's [_.get](https://lodash.com/docs/#get) function)
for accessing tokens from a [styled-components theme](https://styled-components.com/docs/advanced#theming) object.

```js static
import token from 'styled-token';

const Link = styled.a`
    color: ${token('colors.blue')};
`;
```

## Why?

Writing styles in styled-components can quickly get very verbose when accessing theme values.
Here is one of styled-components theme examples:

```js static
const Button = styled.button`
    color: ${props => props.theme.fg};
    border: 2px solid ${props => props.theme.fg};
    background: ${props => props.theme.bg};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
`;
```

There is a lot of boilerplate code to first access the props, then access the theme, then finally the colors.
With a [little bit of cleverness](#how-it-works), you can reduce some of the boilerplate:

```js static
const Button = styled.button(({ theme }) => css`
    color: ${theme.fg};
    border: 2px solid ${theme.fg};
    background: ${theme.bg};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
`);
```

This is a little more manageable, but there is still some boilerplate to make the theme accessible,
and the theme structure is very simple.
With a larger theme that has nested objects and potentially even namespacing, it can quickly get out of hand:

```js static
const Button = styled.button(({ theme }) => css`
    color: ${theme.bootstrap.button.foregroundColor};
    border: 2px solid ${theme.bootstrap.button.foregroundColor};
    background: ${theme.bootstrap.button.backgroundColor};

    font-size: ${theme.bootstrap.fonts.defaultFontSize};
    margin: ${theme.bootstrap.space.lg};
    padding: ${theme.bootstrap.space.xs} ${theme.bootstrap.space.lg};
    border-radius: ${theme.bootstrap.radii.default};
`);
```

Using the styled-token helper function cleans things up nicely:


```js static
import t from 'styled-token';

const Button = styled.button`
    color: ${t('button.foregroundColor')};
    border: 2px solid ${t('button.foregroundColor')};
    background: ${t('button.backgroundColor')};

    font-size: ${t('fonts.defaultFontSize')};
    margin: ${t('space.lg')};
    padding: ${t('space.xs')} ${t('space.lg')};
    border-radius: ${t('radii.default')};
`);
```

## How it works?

Our helper function returns an `Interpolation` which is passed to the styled-components
[`TaggedTemplateLiteral`](https://styled-components.com/docs/api#taggedtemplateliteral).
An `Interpolation` is defined as follows:

> This can either be a string or a function. Strings are combined with the rules as-is.
> Functions will receive the styled component's props as the first and only argument.

In our case, the `Interpolation` is a function that uses the received props to to access the tokens from the theme.
You can read more about the [magic behind styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/) to get a better understanding of how tagged templates and interpolations work.

Since we are returning an interpolation and not a value, there are a few [caveats](#caveats) to keep in mind when using this helper.

## API

### `token( path [, options ] [, callback ] ) => Interpolation`

#### Arguments

1. `path` (`string`|`array`): A string path to the token value, or an array of paths where the first defined token value from the list will be used.
2. `options` (`object`): Options for the token helper.
    * `options.namespace` (`string`): The namespace to pull the value from. This will override any namespace defined on the theme.
    * `options.defaultValue` (`any`): A fallback value that will be used if the `path` is not defined.

3. `callback` (`function`): A callback that will be called with the token value.

#### Returns

`Interpolation`: A styled-components [`TaggedTemplateLiteral`](https://styled-components.com/docs/api#taggedtemplateliteral) interpolation.

#### Examples

```js static
// Access nested object properties with ".", or arrays with "[]"
const Link = styled.a`
    font-weight: ${token('fontWeights.bold')};
    color: ${token('colors.blues[3]')};
`;
```

```js static
// Use "colors.brand" if it is defined, otherwise use "colors.blue"
const Link = styled.a`
    color: ${token(['colors.brand', 'colors.blue'])};
`;
```

```js static
// Pull the token from the "light" namespace
const Link = styled.a`
    color: ${token('colors.blue', { namespace: 'light' })};
`;
```

```js static
// Fallback to "#007bff" if the "colors.blue" token is not defined
const Link = styled.a`
    color: ${token('colors.blue', { defaultValue: '#007bff' })};
`;
```

```js static
// Modify the token value after it is retrieved
const Button = styled.button`
    padding: ${token('space.lg', t => t * 2)}px;
`;
```

```js static
// Pull the "space.lg" token from the "condensed" namespace, using "24" if it is not defined,
// and then multiplying the result by two
const Button = styled.button`
    padding: ${token('space.lg', { namespace: 'condensed', defaultValue: 24 }, t => t * 2)}px;
`;
```

## Namespacing

The function supports namespacing via the `NAMESPACE` property on the theme, or `options.namespace` on the function.

```js static
const theme = {
    NAMESPACE: 'light',
    fontColor: 'darkgray',
    light: {
        fontColor: 'black'
    },
    dark: {
        fontColor: 'white'
    }
};
```

```js static
token('fontColor') // "black"
token('fontColor', { namespace: 'dark' }) // "white"
token('fontColor', { namespace: '' }) // "darkgray"
```

## Caveats

Since our helper returns an [`Interpolation`](#returns) and not a value, there are some situations that you can't use the helper like you would a traditional getter function.

```diff
  // Accessing array properties
  const styles = css`
-     color: ${token('colors.blues')[0]};
+     color: ${token('colors.blues[0]')};
  `;
```

```diff
  // Modifying the token value
  const styles = css`
-     font-family: ${token('fonts.sansSerif').replace('Tahoma', 'Geneva')};
+     font-family: ${token('fonts.sansSerif', t => t.replace('Tahoma', 'Geneva'))};
  `;
```

```diff
  // Fallback values
  const styles = css`
-     color: ${token('colors.lightBlue') || token('colors.blue') || '#007bff'};
+     color: ${token(['colors.lightBlue', 'colors.blue'], { defaultValue: '#007bff' })};
  `;
```

Changing the `appearance` of a button.

```jsx
<Button appearance="primary">Primary button</Button>{' '}
<Button appearance="secondary">Secondary button</Button>{' '}
<Button appearance="danger">Danger button</Button>{' '}
```

Setting a button as `disabled`.

```jsx
<Button appearance="primary" disabled>Primary button</Button>{' '}
<Button appearance="secondary" disabled>Secondary button</Button>{' '}
<Button appearance="danger" disabled>Danger button</Button>{' '}
```

Changing the `variant` of a button.

```jsx
<Button appearance="primary" variant="outline">Primary button</Button>{' '}
<Button appearance="secondary" variant="outline">Secondary button</Button>{' '}
<Button appearance="danger" variant="outline">Danger button</Button>{' '}
```

A `fluid` button takes up all the horizontal space of the containing element.

```jsx
<Button fluid>Fluid button</Button>
```

You can change the size of a button with the `buttonSize` prop.

```jsx
<Button buttonSize="sm">Small button</Button>{' '}
<Button buttonSize="md">Medium button</Button>{' '}
<Button buttonSize="lg">Large button</Button>
```

Buttons with the `inverse` prop for colored backgrounds or background images.

```jsx
import TransparencyWrapper from '../../styleguidist/TransparencyWrapper';

<TransparencyWrapper dark style={{ padding: '10px' }}>
    <Button appearance="primary" inverse>Primary button</Button>{' '}
    <Button appearance="secondary" inverse>Secondary button</Button>
</TransparencyWrapper>
```

You can use the styled-components [polymorphic "as" prop](https://www.styled-components.com/docs/api#as-polymorphic-prop) to change the HTML tag of the component, but know that changing the tag has accessibility implications. Consider adding [`role="button"`](https://www.w3.org/TR/wai-aria-1.1/#button) when changing the element tag to an anchor if the anchor has button behavior.

```jsx
<Button as="a" href="#">Link</Button>{' '}
<Button type="submit">Button</Button>{' '}
<Button as="input" type="button" value="Input" />{' '}
<Button as="input" type="submit" value="Submit" />{' '}
<Button as="input" type="reset" value="Reset" />
```

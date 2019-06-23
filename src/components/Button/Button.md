Changing the type of button using the `buttonType` prop.

```jsx
<Button buttonType="primary">Primary label</Button>{' '}
<Button buttonType="secondary">Secondary button</Button>{' '}
<Button buttonType="caution">Caution button</Button>{' '}
```

Setting a button as diabled with the `disabled` prop.

```jsx
<Button buttonType="primary" disabled>Primary label</Button>{' '}
<Button buttonType="secondary" disabled>Secondary button</Button>{' '}
<Button buttonType="caution" disabled>Caution button</Button>{' '}
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

Inversed buttons with the `inverse` prop for colored backgrounds or background images.

```jsx
import TransparencyWrapper from '../../styleguidist/TransparencyWrapper';

<TransparencyWrapper dark style={{ padding: '10px' }}>
    <Button buttonType="primary" inverse>Primary label</Button>{' '}
    <Button buttonType="secondary" inverse>Secondary button</Button>
</TransparencyWrapper>
```

You can use the styled-components [polymorphic "as" prop](https://www.styled-components.com/docs/api#as-polymorphic-prop) to change the HTML tag of the component, but know that changing the tag has accessibility implications. Consider adding [`role="button"`](https://www.w3.org/TR/wai-aria-1.1/#button) when changing the element tag.

```jsx
<Button as="a" href="https://www.zillow.com/" buttonType="primary">Zillow anchor</Button>{' '}
<Button as="a" href="https://www.zillow.com/" buttonType="secondary">Zillow anchor</Button>{' '}
<Button as="a" href="https://www.zillow.com/" buttonType="caution">Zillow anchor</Button>
```

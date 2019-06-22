#### Button types
```jsx
<Button buttonType="primary">Primary label</Button>{' '}
<Button buttonType="secondary">Secondary button</Button>{' '}
<Button buttonType="caution">Caution button</Button>{' '}
```

#### Disabled buttons
```jsx
<Button buttonType="primary" disabled>Primary label</Button>{' '}
<Button buttonType="secondary" disabled>Secondary button</Button>{' '}
<Button buttonType="caution" disabled>Caution button</Button>{' '}
```

#### Fluid button
```jsx
<Button fluid>Fluid button</Button>
```

#### Button sizes
```jsx
<Button size="sm">Small button</Button>{' '}
<Button size="md">Medium button</Button>{' '}
<Button size="lg">Large button</Button>
```

#### Inversed buttons for colored backgrounds or background images

```jsx
import TransparencyWrapper from '../../styleguidist/TransparencyWrapper';

<TransparencyWrapper dark style={{ padding: '10px' }}>
    <Button buttonType="primary" inverse>Primary label</Button>{' '}
    <Button buttonType="secondary" inverse>Secondary button</Button>
</TransparencyWrapper>
```

#### Anchors as Buttons

```jsx
<Button as="a" href="https://www.zillow.com/" buttonType="primary">Zillow anchor</Button>{' '}
<Button as="a" href="https://www.zillow.com/" buttonType="secondary">Zillow anchor</Button>{' '}
<Button as="a" href="https://www.zillow.com/" buttonType="caution">Zillow anchor</Button>
```

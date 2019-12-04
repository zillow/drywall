You can use the `as` prop to change the HTML tag of the component, and the button will be given the ARIA button role.

```jsx
<Button as="a" href="#">Link</Button>{' '}
<Button type="submit">Button</Button>{' '}
<Button as="input" type="button" value="Input" />{' '}
<Button as="input" type="submit" value="Submit" />{' '}
<Button as="input" type="reset" value="Reset" />
```

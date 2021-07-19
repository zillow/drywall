```jsx
import { Button } from '../../index';

const [items, setItems] = React.useState([]);

const onAddClick = () => {
    setItems([ ...items, Math.random() ]);
};

const onRemoveClick = () => {
    setItems(items.slice(1));
};

<React.Fragment>
    <Button onClick={onAddClick}>Add</Button>{' '}
    <Button onClick={onRemoveClick}>Remove</Button>
    <AnimatedList>
        {items}
    </AnimatedList>
</React.Fragment>
```
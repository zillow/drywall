```jsx
import { Button } from '../../index';

initialState = {
    items: []
};

const onAddClick = () => {
    setState({
        items: [ ...state.items, Math.random() ]
    });
};

const onRemoveClick = () => {
    setState({ items: state.items.slice(1) });
};

<React.Fragment>
    <Button onClick={onAddClick}>Add</Button>{' '}
    <Button onClick={onRemoveClick}>Remove</Button>
    <AnimatedList>
        {state.items}
    </AnimatedList>
</React.Fragment>
```
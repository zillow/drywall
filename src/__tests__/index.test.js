import React from 'react';
import renderer from 'react-test-renderer';
import Button, { StyledButton } from '../components/Button/Button';

describe('Styled Button', () => {
    it('displays a button with requested text', () => {
        const component = renderer.create(<StyledButton>Click Me!</StyledButton>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const component = renderer.create(<StyledButton type="secondary">⊙_ʘ</StyledButton>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('Button', () => {
    it('displays a button with requested text', () => {
        const component = renderer.create(<Button>Click Me!</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const component = renderer.create(<Button type="secondary">⊙_ʘ</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

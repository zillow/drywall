import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, Transition } from 'react-spring/renderprops.cjs';

const Item = styled(animated.li)``;

/**
 * An `AnimatedList` provides a default animation for addition and removal of items in a list.
 * The animation is provided by the [react-spring](https://www.react-spring.io/) library.
 *
 * ##### Browser Support
 * react-spring [requires polyfills](https://github.com/vai0/react-spring/blob/f579b20709/documentation/Gotchas.mdx#browser-support)
 * for Internet Explorer -- if those polyfills are not detected, the list will not animate.
 */
const AnimatedList = styled(({ children, enter, from, leave, ...rest }) => {
    // feature detect for react-spring compatability, otherwise render static items
    let content;
    if (Object.entries) {
        content = (
            <Transition
                native
                keys={child => child.key || child}
                items={children}
                from={from}
                enter={enter}
                leave={leave}
            >
                {child => style => <Item style={style}>{child}</Item>}
            </Transition>
        );
    } else {
        content = React.Children.map(children, child => <Item>{child}</Item>);
    }

    return <ul {...rest}>{content}</ul>;
})``;

AnimatedList.propTypes = {
    /**
     * A dynamic list of items. Each item will be wrapped by an `<AnimatedList.Item>` component.
     * By default, the content of each item will be used as the key. For non-trivial lists, you will
     * want to add a `key` attribute to each item.
     */
    children: PropTypes.node,
    /**
     * The react-spring [`Transition`](https://www.react-spring.io/docs/props/transition) `enter` prop.
     */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    enter: PropTypes.any,
    /**
     * The react-spring [`Transition`](https://www.react-spring.io/docs/props/transition) `from` prop.
     */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    from: PropTypes.any,
    /**
     * The react-spring [`Transition`](https://www.react-spring.io/docs/props/transition) `leave` prop.
     */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    leave: PropTypes.any,
};

AnimatedList.defaultProps = {
    enter: { opacity: 1, height: 'auto' },
    from: { opacity: 0, height: 0 },
    leave: { opacity: 0, height: 0 },
};

AnimatedList.Item = Item;

/** @component */
export default AnimatedList;

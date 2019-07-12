import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseButton from '../CloseButton/CloseButton';
import getTheme from '../../theme/getTheme';

/**
 * Toast is a subtle messages that appears at the top or bottom of the screen.
 * They're used as an informational feedback mechanism for user initiated actions.
 * They are specific the "app" or experience that a user is currently in.
 * Toasts are ephemeral, organic notifications that relate directly to an action the user has taken.
 * While they should draw attention, they should not interrupt users from performing primary tasks.
 *
 * See also [`ToastProvider`](#toastprovider).
 *
 * ##### Accessibility
 * * https://www.w3.org/TR/wai-aria-practices/#alert
 *
 * ##### Inspiration
 * * https://getbootstrap.com/docs/4.3/components/toasts/
 * * https://material-ui.com/components/snackbars/
 * * https://lightningdesignsystem.com/components/toast/
 * * https://ant.design/components/alert/
 * * https://blueprintjs.com/docs/#core/components/toast
 */
const Toast = styled(props => {
    const {
        appearance,
        actionButton,
        body,
        children,
        closeButton,
        header,
        icon,
        isOpen,
        onClose,
        ...rest
    } = props;

    if (!isOpen) {
        return null;
    }

    let childrenContent = children;
    if (typeof children === 'function') {
        let iconContent = icon;
        if (typeof icon === 'function') {
            iconContent = icon(props);
        }

        let closeContent = closeButton;
        if (closeButton) {
            closeContent = React.cloneElement(closeButton, { onClick: onClose });
        }

        childrenContent = children({
            ...props,
            icon: iconContent,
            closeButton: closeContent,
        });
    }

    return <div {...rest}>{childrenContent}</div>;
})`
    ${getTheme('Toast')}
`;

Toast.Icon = styled.div`
    ${getTheme('ToastIcon')}
`;
Toast.Action = styled.div`
    ${getTheme('ToastAction')}
`;
Toast.Close = styled.div`
    ${getTheme('ToastClose')}
`;
Toast.Body = styled.div`
    ${getTheme('ToastBody')}
`;
Toast.Header = styled.header`
    ${getTheme('ToastHeader')}
`;

Toast.propTypes = {
    /**
     * An optional action button.
     */
    actionButton: PropTypes.node,
    /**
     * Toasts can come in different styles that carry different semantic meanings.
     * e.g. "info", "success", "warning", "error"
     */
    appearance: PropTypes.string,
    /**
     * The body content of the toast message.
     */
    body: PropTypes.node,
    /**
     * In general, you will want to use the `body` and `header` props,
     * but you can use the `children` prop to override the default component layout.
     * When passing a function, the function will receive all the component props as the only
     * argument (Note: some of the props may have been modified and/or enhanced,
     * so you should always use the values that are passed to the render function).
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * The close button node. You can set this to null to remove the close button from the toast.
     */
    closeButton: PropTypes.node,
    /**
     * The header content of the toast message.
     *
     * It is uncommon to have a header in a toast component, but some systems may want to include
     * it in their toast layout.
     */
    header: PropTypes.node,
    /**
     * An icon node or a function that returns an icon node.
     * The function will be passed the component's props as the one and only parameter.
     */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Toasts are a controlled component where the `isOpen` prop controls the visibility.
     */
    isOpen: PropTypes.bool,
    /**
     * Function called with the `closeButton` is clicked.
     */
    onClose: PropTypes.func,
    /**
     * Toasts should have a role of [status](https://www.w3.org/TR/wai-aria-1.1/#status) or
     * [alert](https://www.w3.org/TR/wai-aria-1.1/#alert) to signal assistive technologies
     * that it requires the user's attention. In general, you will always want to use the less
     * strict "status" role.
     */
    role: PropTypes.oneOf(['status', 'alert']),
};

Toast.defaultProps = {
    // eslint-disable-next-line zillow/react/prop-types
    children: ({ icon, header, body, actionButton, closeButton }) => (
        <React.Fragment>
            {icon && <Toast.Icon>{icon}</Toast.Icon>}
            {header && <Toast.Header>{header}</Toast.Header>}
            {body && <Toast.Body>{body}</Toast.Body>}
            {actionButton && <Toast.Action>{actionButton}</Toast.Action>}
            {closeButton && <Toast.Close>{closeButton}</Toast.Close>}
        </React.Fragment>
    ),
    closeButton: <CloseButton />,
    isOpen: true,
    role: 'status',
};

/** @component */
export default Toast;

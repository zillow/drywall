import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getTheme from '../../theme/getTheme';
import ToastQueue from '../../js/ToastQueue';
import AnimatedList from '../AnimatedList/AnimatedList';

const ToastContext = React.createContext();

export const withToast = Component => props => (
    <ToastContext.Consumer>
        {context => <Component {...props} {...context} />}
    </ToastContext.Consumer>
);

class ToastProviderClass extends React.Component {
    constructor(props) {
        super(props);
        this.queue = new ToastQueue(props);
        this.state = {
            toasts: [],
        };
    }

    componentDidMount() {
        this.unsubscribe = this.queue.subscribe(this.onQueueChange);

        if (typeof window !== 'undefined') {
            if (this.props.pauseOnWindowBlur) {
                window.addEventListener('blur', this.onWindowBlur);
            }
            if (this.props.resumeOnWindowFocus) {
                window.addEventListener('focus', this.onWindowFocus);
            }
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        if (typeof window !== 'undefined') {
            window.removeEventListener('focus', this.onWindowFocus);
            window.removeEventListener('blur', this.onWindowBlur);
        }
    }

    onWindowFocus = () => {
        this.queue.resumeAll();
    };

    onWindowBlur = () => {
        this.queue.pauseAll();
    };

    onQueueChange = () => {
        this.setState({ toasts: this.queue.getState() });
    };

    getContext = () => ({
        enqueueToast: this.enqueueToast,
    });

    enqueueToast = (val, opts) => {
        this.queue.enqueue(val, opts || this.props.optionsFn);
    };

    render() {
        const {
            children,
            duration,
            maxSize,
            optionsFn,
            pauseOnMouseEnter,
            pauseOnWindowBlur,
            placement,
            portal,
            portalContent,
            resumeOnMouseLeave,
            resumeOnWindowFocus,
            ...rest
        } = this.props;

        const toasts = this.state.toasts.map(toast =>
            React.cloneElement(toast.value, {
                key: toast.toastId,
                onClose: toast.dismiss,
                onMouseEnter: pauseOnMouseEnter ? toast.pause : undefined,
                onMouseLeave: resumeOnMouseLeave ? toast.resume : undefined,
            })
        );

        const toastContent = portalContent({ toasts });

        let content = <div {...rest}>{toastContent}</div>;

        if (portal === true && typeof document !== 'undefined') {
            content = ReactDOM.createPortal(content, document.body);
        }
        if (portal !== true && portal) {
            content = ReactDOM.createPortal(content, portal);
        }

        return (
            <ToastContext.Provider value={this.getContext()}>
                {children}
                {content}
            </ToastContext.Provider>
        );
    }
}

/**
 * `ToastProvider` provides the context for the the `withToast` higher order component.
 * When you wrap your component with `withToast`, your component will be enhanced with the
 * `enqueueToast` prop. This prop can be called with a `Toast` component to be added to the
 * toast queue.
 *
 * It is possible to have multiple providers, but you must be careful with the positions such that
 * they do not overlap. It is recommended that you only have one provider per application.
 */
const ToastProvider = styled(ToastProviderClass)`
    ${getTheme('ToastProvider')}
`;

// This is a little unusual -- it allows both eslint to validate and styleguidist to parse props.
// eslint-disable-next-line no-multi-assign
ToastProvider.propTypes = ToastProviderClass.propTypes = {
    /**
     * Components that require the `withToast` context need to be children of this component.
     */
    children: PropTypes.node.isRequired,
    /**
     * The default duration in milliseconds to show a toast before automatically dismissing it.
     * Set this to `0` and toasts must manually be dismissed.
     *
     * Note: A `duration` returned by `optionsFn` would take precedence over this.
     */
    duration: PropTypes.number,
    /**
     * The maximum number of toasts visible at once.
     * Set this to `0` to remove the size limit.
     */
    maxSize: PropTypes.number,
    /**
     * An options function allows you to globally customize the options object passed to
     * `enqueueToast`. This is useful for setting a different duration based on other props such as
     * `appearance`.
     */
    optionsFn: PropTypes.func,
    /**
     * By default, toasts are paused when the mouse enters them.
     */
    pauseOnMouseEnter: PropTypes.bool,
    /**
     * By default, all toasts are paused when the window loses focus.
     */
    pauseOnWindowBlur: PropTypes.bool,
    /**
     * Where the toast region will exist with respect to the viewport.
     * e.g. "top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"
     */
    placement: PropTypes.string,
    /**
     * By default, toasts will be rendered into a Portal in the document body.
     * With this prop, you can specify a different container,
     * or you can disable the portal to render the content inline by passing false.
     */
    portal: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    /**
     * A render function for the toast content. By default, toasts will be rendered into an
     * `AnimatedList`. The render function is passed an object with `toasts` as the only property.
     */
    portalContent: PropTypes.func,
    /**
     * By default, toasts are resumed when the mouse leaves them.
     */
    resumeOnMouseLeave: PropTypes.bool,
    /**
     * By default, all toasts are resumed when the window gains focus.
     */
    resumeOnWindowFocus: PropTypes.bool,
};

// This is a little unusual -- it allows both eslint to validate and styleguidist to parse props.
// eslint-disable-next-line no-multi-assign
ToastProvider.defaultProps = ToastProviderClass.defaultProps = {
    duration: 5000,
    portal: true,
    maxSize: 3,
    optionsFn: undefined,
    pauseOnMouseEnter: true,
    pauseOnWindowBlur: true,
    placement: undefined,
    // eslint-disable-next-line zillow/react/prop-types
    portalContent: ({ toasts }) => <AnimatedList>{toasts}</AnimatedList>,
    resumeOnMouseLeave: true,
    resumeOnWindowFocus: true,
};

/** @component */
export default ToastProvider;

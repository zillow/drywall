Adding a new toast to the queue using `withToast` and `enqueueToast`.

```jsx
import { Button, Toast, ToastProvider, withToast } from '../../index';

const ToastButton = withToast(props => (
    <Button onClick={() => props.enqueueToast(
        <Toast body="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
    )}>
        {props.children}
    </Button>
));

<ToastProvider portal={false}>
    <ToastButton>Toast!</ToastButton>
</ToastProvider>
```

You can customize the `duration` of an individual toast by passing an options object to `enqueueToast`.

```jsx
import { Button, Toast, ToastProvider, withToast } from '../../index';

const ToastButton = withToast(props => (
    <Button onClick={() => props.enqueueToast(
        <Toast body="This toast must be manually dismissed." />,
        { duration: 0 }
    )}>
        {props.children}
    </Button>
));

<ToastProvider portal={false}>
    <ToastButton>Toast!</ToastButton>
</ToastProvider>
```

You can alternatively give the provider an `optionsFn` callback that allows you to customize the toast
options as a product of the toast value.

```jsx
import { Button, Toast, ToastProvider, withToast } from '../../index';

const InfoToastButton = withToast(props => (
    <Button onClick={() => props.enqueueToast(
        <Toast appearance="info" body="This toast will be dismissed automatically." />
    )}>
        {props.children}
    </Button>
));

const ErrorToastButton = withToast(props => (
    <Button onClick={() => props.enqueueToast(
        <Toast appearance="error" body="This toast must be manually dismissed." />
    )}>
        {props.children}
    </Button>
));

<ToastProvider
    portal={false}
    optionsFn={toast => toast.props.appearance === 'error' ? { duration: 0 } : {}}
>
    <InfoToastButton>Info</InfoToastButton>
    <ErrorToastButton>Error</ErrorToastButton>
</ToastProvider>
```

The `enqueueToast` function can optionally be passed a function that returns the `Toast` component.
The function will be passed an object with the `toastId`, as well as `pause`, `resume`, and `dismiss` functions
that can be called programatically.

Note: `pause` and `resume` are automatically called with `onMouseLeave` and `onMouseEnter` by default.
You can disable this with the `pauseOnMouseEnter` and `resumeOnMouseLeave` props.

```jsx
import { Button, Toast, ToastProvider, withToast } from '../../index';

const ToastButton = withToast(props => (
    <Button onClick={() => props.enqueueToast(({ toastId, pause, resume, dismiss }) => (
        <Toast closeButton={null} body={(
           <React.Fragment>
               Toast #{toastId}{' '}
               <Button onClick={pause}>Pause</Button>{' '}
               <Button onClick={resume}>Resume</Button>{' '}
               <Button onClick={dismiss}>Dismiss</Button>
           </React.Fragment>
        )} />
    ))}>
        {props.children}
    </Button>
));

<ToastProvider portal={false} pauseOnMouseEnter={false} resumeOnMouseLeave={false}>
    <ToastButton>Toast!</ToastButton>
</ToastProvider>
```

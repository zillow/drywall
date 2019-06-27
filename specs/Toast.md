Toast
=====

Toasts are subtle messages that appear on the screen, used as an informational feedback mechanism for user initiated actions.

Inspiration
-----------

* https://getbootstrap.com/docs/4.3/components/toasts/
* https://material-ui.com/components/snackbars/
* https://lightningdesignsystem.com/components/toast/
* https://ant.design/components/alert/
* https://blueprintjs.com/docs/#core/components/toast

Discovery
---------

#### Are there similar components already in the library? If yes, what are they and can they be modified instead to capture this use-case?

There are no similar components currently in the library, but it has some similarities to a dialog component.

#### Who is the primary consumer for this component? Does it belong in the core API?

This is a core component.

#### Does the component behave any differently on desktop than it does on mobile? Is there any touch specific behavior?

Should behave the same on desktop and mobile.

#### How does the component behave with respect to other components?

Toasts should stack when there are multiple on the page at once. You should be able to limit the number showing at once.

There will be two separate components involved, one for the Toast itself, and then a container that houses and manages all the Toasts it contains.

#### Are there any existing libraries that can potentially be leveraged?

*  https://github.com/iamhosseindhv/notistack

#### Are there any performance considerations?

Need to look into the weight of the [notistack](https://github.com/iamhosseindhv/notistack) library if we choose to use it.

#### [Theming] Is there any animation, transition, or other forms of motion involved?

Toasts should animate in and out.

#### [Theming] Are there any z-index considerations?

Toasts should live high in the z-index, above modals in case the modal prompts a toast.

Accessibility
-------------

* https://www.w3.org/TR/wai-aria-practices/#alert

    > Because alerts are intended to provide important and potentially time-sensitive information without interfering with the user's ability to continue working, it is crucial they **do not affect keyboard focus.**

    > It is also important to avoid designing alerts that disappear automatically.

    > An alert (WAI-ARIA live region) does not require any keyboard interaction.

* https://getbootstrap.com/docs/4.3/components/toasts/#accessibility

    > ...you should wrap your toasts in an aria-live region. Changes to live regions (such as injecting/updating a toast component) are automatically announced by screen readers without needing to move the user’s focus or otherwise interrupt the user...

    > Additionally, include aria-atomic="true" to ensure that the entire toast is always announced as a single (atomic) unit, rather than announcing what was changed...

    > You also need to adapt the role and aria-live level depending on the content. If it’s an important message like an error, use role="alert" aria-live="assertive", otherwise use role="status" aria-live="polite" attributes.

    > As the content you’re displaying changes, be sure to update the delay timeout to ensure people have enough time to read the toast.

* https://www.w3.org/TR/wai-aria-1.1/#status

    > Authors SHOULD ensure an element with role status does not receive focus as a result of change in status.

* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions

    > Normally, only aria-live="polite" is used. Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute.

* https://lightningdesignsystem.com/components/toast/#Accessibility

    > Notifications should contain role="status" on the container to signal to assistive technology that they require the user’s attention. Historically the role of alert would be used, but because you can invoke multiple toasts, assertive alerts would override previous toasts in the screen reader's speech queue. Role of status is a polite live region, which does not clear the queue, reducing the risk of a toast message being missed.


| Attribute | Notes |
| --------- | ----------- |
| [`role="status"`](https://www.w3.org/TR/wai-aria-1.1/#status) | A type of [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region). Has implicit `aria-live="polite"` and `aria-atomic="true"` |
| [`role="alert"`](https://www.w3.org/TR/wai-aria-1.1/#alert) | A type of [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region). Has implicit `aria-live="assertive"` and `aria-atomic="true"` |
| `aria-live="polite"` | This is generally the level we want to use for toasts. This is not needed when using `role="status"`. |
| `aria-live="assertive"` | This steals the attention and should be avoided unless for critical messages. This is not needed when using `role="alert"` |
| [`aria-atomic="true"`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic) | Always present all of the region, as opposed to just the parts that changed. |
| [`role="region"`](https://www.w3.org/TR/wai-aria-1.1/#region) | This probably is not necessary for anything. Maybe the component that contains all the toasts. |


API Specifications
------------------

### Props

#### `<Toast>`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `actionButton` | `node` | | An optional action button. |
| `appearance` | `string` | | Toasts can come in different styles that carry different semantic meanings. e.g. `"info"`, `"success"`, `"warning"`, `"error"` |
| `body` | `node` | | The body content of the toast message. |
| `children` | `node` \| `func` | | Toast content or a render function that returns the content. |
| `closeButton` | `node` | `<ToastClose>` | A close button. You can set this to null to remove the close button from toasts. |
| `header` | `node` | | The header content of the toast message. |
| `icon` | `node` | `node` \| `func` | An icon node or a function that returns an icon node. |
| `isOpen` | `bool` | false | Controls the visibility of the toast. |
| `onClose` | `func` | | Function callback called for close requests from the close button. |

| `role` | `string` | `"status"` | Toasts should have a role of status or alert to signal assistive technologies that it requires the user's attention. In general, you will always want to use the less strict "status" role. |

#### `<CloseButton>`

A close button for toasts and other dialogs.

#### `<ToastProvider>`

There can be multiple applications on the page, but all apps should share the same notification area. The first app to initialize should set up the portal and configuration; all subsequent providers will use the portal and configuration of the first to initialize.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `placement` | `string` | | Where the region will exist with respect to the viewport. e.g. `"top-start"`, `"top"`, `"top-end"`, `"bottom-start"`, `"bottom"`, `"bottom-end"` |
| `maxSize` | `number` | 3 | The maximum number of toasts that can be open at once. |
| `portal` | `node` | document.body | The insertion point for the provider portal. |

#### `withToast`

A higher order component that provides the `enqueueToast` prop.

##### `enqueueToast(toast, options)`

| Param | Type | Deafult | Description |
| ----- | ---- | ------- | ----------- |
| `toast` | `node` | REQUIRED | The toast node. |
| `options` | `object` | | Toast options object. |
| `options.duration` | `number` | 5000 | The delay in milliseconds before automatically closing a toast. If 0, the toast must be manually dismissed. |

### Example Usage

```jsx
import { ToastProvider } from 'drywall';

ReactDOM.render(
    <ToastProvider>
        <MyApplication />
    </ToastProvider>,
    document.querySelector('.my-application')
);
```

```jsx
import { withToast } from 'drywall';

class MyApplication extends React.Component {
    onButtonClick = () => {
        this.props.enqueueToast(
            <Toast appearance="info" action={<Button>Undo</Button>}>
                Saved Search removed.
            </Toast>
        );
    }
    render() {
        return <Button onClick={this.onButtonClick}>Show toast</Button>;
    }
}

export default withToast(MyApplication);
```

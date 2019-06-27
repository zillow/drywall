Toast
=====

Toasts are subtle messages that appear on the screen, used as an informational feedback mechanism for user initiated actions.

Discovery
---------

#### Are there similar components already in the library? If yes, what are they and can they be modified instead to capture this use-case?

There are no similar components.

#### Who is the primary consumer for this component? Does it belong in the core API?

This is a core component.

#### Are there any accessibility concerns or guidelines that should be followed?

* https://www.w3.org/TR/wai-aria-practices/#alert
* https://getbootstrap.com/docs/4.3/components/toasts/#accessibility
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions

#### Does the component behave any differently on desktop than it does on mobile? Is there any touch specific behavior?

Should behave the same on desktop and mobile.

#### How does the component behave with respect to other components?

Toasts should stack when there are multiple on the page at once. You should be able to limit the number showing at once.

#### Are there any performance considerations?

Need to look into the weight of the [notistack](https://github.com/iamhosseindhv/notistack) library if we choose to use it.

#### Any prior art of this component (e.g. material-ui, bootstrap)?

* https://getbootstrap.com/docs/4.3/components/toasts/
* https://material-ui.com/components/snackbars/
* https://lightningdesignsystem.com/components/toast/
* https://ant.design/components/alert/
* https://blueprintjs.com/docs/#core/components/toast

#### [Theming] Is there any animation, transition, or other forms of motion involved?

Toasts should animate in and out.

#### [Theming] Are there any z-index considerations?

Toasts should live high in the z-index, above modals in case the modal prompts a toast.

API Specifications
------------------

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| *prop name* | *e.g. string, bool* | *prop default value* | *prop description* |

### Example Usage

```jsx
<ToastRegion>
    <Toast />
</ToastRegion>
```

### Additional Specifications

* Library for managing toasts: https://github.com/iamhosseindhv/notistack

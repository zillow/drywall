Toast
=====

Toasts are subtle messages that appear on the screen, used as an informational feedback mechanism for user initiated actions.

Discovery
---------

#### Are there similar components already in the library? If yes, what are they and can they be modified instead to capture this use-case?

There are no similar components.

#### Who is the primary consumer for this component? Does it belong in the core API?

Everyone, this should be a core component.

#### Are there any accessibility concerns or guidelines that should be followed?

* https://www.w3.org/TR/wai-aria-practices/#alert
* https://getbootstrap.com/docs/4.3/components/toasts/#accessibility
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions

#### Does the component behave any differently on desktop than it does on mobile? Is there any touch specific behavior?

* *Answer the question*

#### How does the component behave with respect to other components?

Can toasts stack?

#### Are there any performance considerations?

Need to look into the weight of the [notistack](https://github.com/iamhosseindhv/notistack) library if we choose to use it.

#### Any prior art of this component (e.g. material-ui, bootstrap)?

Inspiration:

* https://getbootstrap.com/docs/4.3/components/toasts/
* https://material-ui.com/components/snackbars/
* https://lightningdesignsystem.com/components/toast/

Libraries:

* https://github.com/iamhosseindhv/notistack

#### [Theming] Is there any animation, transition, or other forms of motion involved?

Toasts should animate in and out.

#### [Theming] Are there any z-index considerations?

Toasts should live high in the z-index. Do toasts show above modals?

API Specifications
------------------

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| *prop name* | *e.g. string, bool* | *prop default value* | *prop description* |

### Example Usage

    <Component />

### Additional Specifications

*Add any other specifications (e.g. aria attributes, css transitions/animations, media queries)*

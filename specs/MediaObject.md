MediaObject
===========

A layout utility for aligning a media figure next to content.

Inspiration
-----------

* https://getbootstrap.com/docs/4.0/layout/media-object/
* https://lightningdesignsystem.com/utilities/media-objects/
* https://philipwalton.github.io/solved-by-flexbox/demos/media-object/
* http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code

Discovery
---------

#### Are there similar components already in the library? If yes, what are they and can they be modified instead to capture this use-case?

* No

#### Who is the primary consumer for this component? Does it belong in the core API?

* Core component

#### Does the component behave any differently on desktop than it does on mobile? Is there any touch specific behavior?

* No

#### How does the component behave with respect to other components?

* Should support any content for the body and media. Should allow nesting of other `MediaObject` components.

#### Are there any existing libraries that can potentially be leveraged?

* No

#### Are there any performance considerations?

* No

#### [Theming] Is there any animation, transition, or other forms of motion involved?

* No

#### [Theming] Are there any z-index considerations?

* No


API Specifications
------------------

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| media | `PropTypes.node` | REQUIRED | The media content. |
| children | `PropTypes.node` | REQUIRED | The body content. |
| align | `PropTypes.oneOf(['top', 'bottom', 'center'])` | `"top"` | How to align the media content with respect to the text. |
| reverse | `PropTypes.bool` | `false` | By default, the media will come before the body. Set this to reverse the order of media and body. |
| gutter | | | Used for defining spacing between the media and children content. |

### Example Usage

```jsx
<MediaObject
    media={<img src="image.png" />}
    align="center"
    reverse
>
    <p>This is some text<p>
</MediaObject>
```

```jsx
<MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
    ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
    amet placerat. Morbi rhoncus dictum elementum.
</MediaObject>
```

Center aligned.

```jsx
<MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />} align="center">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
    ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
    amet placerat. Morbi rhoncus dictum elementum.
</MediaObject>
```

Bottom aligned.

```jsx
<MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />} align="bottom">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
    ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
    amet placerat. Morbi rhoncus dictum elementum.
</MediaObject>
```

Reversed media and content.

```jsx
<MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />} reverse>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
    ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
    amet placerat. Morbi rhoncus dictum elementum.
</MediaObject>
```

Nested media objects.

```jsx
<MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
    ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
    amet placerat. Morbi rhoncus dictum elementum.

    <MediaObject media={<div style={{ height: '64px', width: '64px', background: '#777' }} />}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare lorem sit amet quam mattis,
        ac fringilla est commodo. Vestibulum rhoncus congue tempus. Vivamus cursus scelerisque nulla sit
        amet placerat. Morbi rhoncus dictum elementum.
    </MediaObject>
</MediaObject>
```

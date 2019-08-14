import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getTheme from '../../theme/getTheme';

// This wrapper is used for nothing other than filtering props that are passed to it so they don't
// bleed through to the DOM
// (styled-components does not filter props when wrapping a third-party component).
const StyledMediaObject = styled.div``;

/**
 * A layout utility for aligning a media figure next to content.
 *
 * ##### Inspiration
 * * https://getbootstrap.com/docs/4.0/layout/media-object/
 * * https://lightningdesignsystem.com/utilities/media-objects/
 * * https://philipwalton.github.io/solved-by-flexbox/demos/media-object/
 * * http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code
 */
const MediaObject = styled(props => {
    const { renderLayout } = props;

    let content = renderLayout;
    if (typeof renderLayout === 'function') {
        content = renderLayout(props);
    }

    return <StyledMediaObject {...props}>{content}</StyledMediaObject>;
})`
    ${getTheme('MediaObject')}
`;

MediaObject.Body = styled.div`
    ${getTheme('MediaObjectBody')}
`;
MediaObject.Media = styled.div`
    ${getTheme('MediaObjectMedia')}
`;

MediaObject.propTypes = {
    /**
     * How to align the media content with respect to the children content.
     */
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    /**
     * The body content.
     */
    children: PropTypes.node,
    /**
     * The spacing between media and children content.
     */
    // eslint-disable-next-line zillow/react/forbid-prop-types
    gutter: PropTypes.any,
    /**
     * The media content.
     */
    media: PropTypes.node,
    /**
     * You can use `renderLayout` to modify the default composition of the component.
     * Pass your own node using the `<MediaObject.Body>` and `<MediaObject.Media>` wrappers,
     * or pass a render function that receives enhanced props as the only argument.
     */
    renderLayout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * By default, the media will come before the body.
     * Set this to reverse the order of media and body.
     */
    reverse: PropTypes.bool,
};

MediaObject.defaultProps = {
    align: 'top',
    // eslint-disable-next-line zillow/react/prop-types
    renderLayout: ({ media, children }) => (
        <React.Fragment>
            {media && <MediaObject.Media>{media}</MediaObject.Media>}
            {children && <MediaObject.Body>{children}</MediaObject.Body>}
        </React.Fragment>
    ),
    reverse: false,
};

/** @component */
export default MediaObject;

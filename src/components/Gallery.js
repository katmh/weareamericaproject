/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'
import Masonry from 'react-masonry-css'

const gallery = css`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;

    .gallery-column {
        padding-left: 30px; /* gutter size */
        background-clip: padding-box;
    }

    .gallery-column img {
        max-width: 100%;
    }
`

const Gallery = ({ children }) => (
    <Masonry
        breakpointCols={3}
        css={gallery}
        className="gallery"
        columnClassName="gallery-column"
    >
        { children }
    </Masonry>
)

export default Gallery
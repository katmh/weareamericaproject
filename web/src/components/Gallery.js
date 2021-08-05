/** @jsx jsx */
import { css } from "@emotion/core"
import { jsx } from "theme-ui"
import Masonry from "react-masonry-css"

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
`

const Gallery = props => (
  <Masonry
    breakpointCols={{
      default: props.n,
      1000: props.n > 3 ? 3 : props.n,
      800: 2,
      600: 1,
    }}
    css={gallery}
    className="gallery"
    columnClassName="gallery-column"
  >
    {props.children}
  </Masonry>
)

export default Gallery

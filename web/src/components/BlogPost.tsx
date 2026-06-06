/** @jsx jsx */
import { jsx } from "theme-ui"

const BlogPost = ({ data }) => (
  <article>
    <div
      sx={{
        display: "block",
        pb: 2,
        borderBottom: "1px solid gray",
        borderBottomColor: "accent",
        mb: 2,
      }}
    >
      <h2
        sx={{
          fontSize: [3, 4],
          fontFamily: "heading",
          fontWeight: "400",
          lineHeight: "1.1",
          color: "#422",
          mt: 4,
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        {data.frontmatter.title}
      </h2>
      <p
        sx={{
          color: "text",
          fontFamily: "body",
          fontSize: 0,
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: ["135%", "145%"],
          my: 1,
        }}
      >
        {data.frontmatter.date}
      </p>
    </div>

    <div
      dangerouslySetInnerHTML={{ __html: data.html }}
      sx={{
        overflow: "auto",
        p: {
          color: "text",
          fontFamily: "body",
          fontSize: [0, 1],
          fontWeight: 300,
          lineHeight: ["135%", "145%"],
          my: 1,
        },
        img: {
          float: "left",
          maxWidth: ["50%", "25%"],
          mr: 3,
          mb: 3,
          mt: 2,
        },
        a: {
          color: "accent",
        },
      }}
    />
  </article>
)

export default BlogPost

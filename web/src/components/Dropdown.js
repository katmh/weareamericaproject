/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import slugify from "../../utils/slugify"

const Dropdown = props => (
  <div
    sx={{
      display: "inline-block",
      mt: 2,
      mr: 2,
      ":hover ul": {
        display: "block",
        maxHeight: "30vh",
      },
    }}
  >
    <button
      sx={{
        background: "#ddd",
        border: "none",
        outline: "none",
        display: "inline-block",
        cursor: "pointer",
        fontFamily: "heading",
        fontWeight: "400",
        padding: ".4rem .6rem .25rem",
        fontSize: 1,
        color: "text",
      }}
    >
      {props.contentName}
    </button>
    <ul
      sx={{
        display: "none",
        overflowY: "scroll",
        position: "absolute",
        float: "left",
        opacity: "1",
        transition: ".15s",
        border: "1px solid #bbb",
      }}
    >
      {props.content.group.map(group => (
        <li
          sx={{
            listStyle: "none",
            fontFamily: "body",
            background: "#fff",
            maxWidth: "400px",
          }}
        >
          <Link
            to={"/" + props.contentSlug + "/" + slugify(group.fieldValue)}
            sx={{
              textDecoration: "none",
              fontFamily: "heading",
              fontWeight: "400",
              padding: ".4rem .6rem .25rem",
              fontSize: 1,
              color: "text",
              display: "block",
              transition: ".15s",
              ":hover": {
                background: "#633",
                color: "#fff",
              },
            }}
          >
            {group.fieldValue}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Dropdown

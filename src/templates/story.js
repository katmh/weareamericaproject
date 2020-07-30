/** @jsx jsx */
import Layout from "../components/Layout"
import { jsx } from "theme-ui"
import BackToAll from "../components/BackToAll"
import { Link } from "gatsby"
import slugify from "../components/slugify"

export default ({ pageContext: { data } }) => (
  <Layout>
    <BackToAll name="stories" path="/stories" />
    <h1
      sx={{
        fontFamily: "heading",
        fontSize: 5,
        color: "accent",
      }}
    >
      {data.Story_Name}
    </h1>
    <h2
      sx={{
        fontFamily: "heading",
        fontSize: 3,
        textTransform: "uppercase",
        color: "text",
      }}
    >
      By {data.Author}
    </h2>
    <h3
      sx={{
        fontFamily: "heading",
        my: 3,
        fontSize: 2,
        color: "muted",
      }}
    >
      {data.School}
    </h3>
    <p>
      {data.Tags ? (
        <ul>
          <span
            sx={{
              fontFamily: "body",
              fontWeight: "700",
              mr: 1,
            }}
          >
            Tags:
          </span>
          {data.Tags.map(tag => (
            <li
              sx={{
                listStyle: "none",
                display: "inline-block",
                mr: 1,
              }}
            >
              <Link
                to={"/tag/" + slugify(tag)}
                sx={{
                  fontFamily: "body",
                  lineHeight: "100%",
                  textDecoration: "none",
                  bg: "accent",
                  color: "background",
                  p: ".4rem .6rem",
                  borderRadius: ".3rem",
                  fontSize: 0,
                  fontWeight: "700",
                  transition: ".1s",
                  display: "inline-block",
                  my: ".15rem",
                  ":hover": {
                    color: "#fff",
                    background: "#844",
                  },
                }}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </p>

    <audio
      controls
      src={data.Audio ? data.Audio[0].url : ""}
      sx={{
        display: "block",
        my: 4,
      }}
    >
      Your browser does not support the <code>audio</code> element. :(
    </audio>

    {data.Second_Language ? (
      <span
        sx={{
          fontFamily: "body",
          fontWeight: "700",
          mr: 1,
          verticalAlign: "top",
        }}
      >
        Listen in {data.Second_Language}
      </span>
    ) : null}
    {data.Second_Language ? (
      <audio
        controls
        src={
          data.Second_Language_Audio ? data.Second_Language_Audio[0].url : ""
        }
        sx={{
          display: "block",
          mt: 2,
          mb: 4,
        }}
      >
        Your browser does not support the <code>audio</code> element. :(
      </audio>
    ) : null}

    <img
      src={data.Photo ? data.Photo[0].thumbnails.large.url : ""}
      alt={"Photo of" + data.Author}
      sx={{
        maxWidth: "100%",
      }}
    />
  </Layout>
)

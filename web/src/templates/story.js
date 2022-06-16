/** @jsx jsx */
import Layout from "../components/Layout";
import { jsx } from "theme-ui";
import BackToAll from "../components/BackToAll";
import { Link } from "gatsby";
import slugify from "../../utils/slugify";
import ReactMarkdown from "react-markdown";
import ShareBtns from "../components/ShareBtns";

const Story = ({ pageContext: { data } }) => {
  return (
    <Layout>
      <BackToAll name="stories" path="/stories" />
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 2fr"],
          gridGap: "1rem"
        }}
      >
        <div className="story-info">
          <h1
            sx={{
              fontFamily: "heading",
              fontSize: 4,
              color: "accent",
              lineHeight: 1.1,
              mb: 2
            }}
          >
            {data.Story_Name}
          </h1>
          <h2
            sx={{
              fontFamily: "heading",
              fontSize: 2,
              lineHeight: 1.25,
              color: "muted",
              mb: 3
            }}
          >
            {data.Author} ({data.School}, {data.State})
          </h2>
          <p>
            {data.Tags ? (
              <ul>
                <span
                  sx={{
                    fontFamily: "body",
                    fontWeight: "700",
                    mr: 1
                  }}
                >
                  Tags:
                </span>
                {data.Tags.map(tag => (
                  <li
                    key={slugify(tag)}
                    sx={{
                      listStyle: "none",
                      display: "inline-block",
                      mr: 1
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
                          background: "#844"
                        }
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

          {(data.Audio_URL || data.Audio) && (
            <audio
              controls
              src={data.Audio_URL ?? data.Audio[0].url}
              sx={{
                display: "block",
                my: 4
              }}
            >
              Your browser does not support the <code>audio</code> element. :(
            </audio>
          )}

          {data.Second_Language ? (
            <span
              sx={{
                fontFamily: "body",
                fontWeight: "700",
                mr: 1,
                verticalAlign: "top"
              }}
            >
              Listen in {data.Second_Language}
            </span>
          ) : null}
          {data.Second_Language ? (
            <audio
              controls
              src={
                data.Second_Language_Audio
                  ? data.Second_Language_Audio[0].url
                  : ""
              }
              sx={{
                display: "block",
                mt: 2,
                mb: 4
              }}
            >
              Your browser does not support the <code>audio</code> element. :(
            </audio>
          ) : null}

          <ShareBtns title={data.Story_Name} />
        </div>
        <img
          src={data.Photo_URL ?? data.Photo[0].thumbnails.large.url}
          alt={"Photo of" + data.Author}
          sx={{
            maxWidth: "100%"
          }}
        />
      </div>
      <div
        sx={{
          mt: 4,
          p: {
            my: 3,
            fontFamily: "body",
            lineHeight: 1.5,
            color: "text"
          }
        }}
      >
        <ReactMarkdown>{data.Text}</ReactMarkdown>
        <p>
          © {data.Author}. All rights reserved. If you are interested in quoting
          this story, contact the national team through this website and we can
          put you in touch with the young person’s teacher.
        </p>
      </div>
    </Layout>
  );
};

export default Story;

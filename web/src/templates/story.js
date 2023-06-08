/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import slugify from "../../utils/slugify";
import BackToAll from "../components/BackToAll";
import Layout from "../components/Layout";
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
            {data.storyTitle}
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
            {data.author}, ({data.school.name}, {data.school.location})
          </h2>
          <p>
            {data.tags ? (
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
                {data.tags.map(tag => (
                  <li
                    key={slugify(tag)}
                    sx={{
                      listStyle: "none",
                      display: "inline-block",
                      mr: 1,
                      my: 0,
                      ml: 0
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

          {data.audio?.asset ? (
            <audio
              controls
              src={data.audio.asset.url}
              sx={{
                display: "block",
                my: 4
              }}
            >
              Your browser does not support the <code>audio</code> element. :(
            </audio>
          ) : null}

          {data.secondLanguageAudio ? (
            <span
              sx={{
                fontFamily: "body",
                fontWeight: "700",
                mr: 1,
                verticalAlign: "top"
              }}
            >
              Listen in {data.secondLanguageAudio.language}
            </span>
          ) : null}
          {data.secondLanguageAudio ? (
            <audio
              controls
              src={
                data.Second_Language_Audio
                  ? data.secondLanguageAudio.asset.url
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

          <ShareBtns title={data.storyTitle} />
        </div>
        <img
          src={data.photo ? data.photo.asset.url : ""}
          alt={"Photo of" + data.Author}
          sx={{
            maxWidth: "100%"
          }}
        />
      </div>
      <div sx={{ mt: 4 }}>
        <PortableText value={data._rawText} />
        <p className="caption2">
          © {data.author}. All rights reserved. If you are interested in quoting
          this story, <Link to="/contact">contact</Link> the national team and
          we can put you in touch with the author’s teacher.
        </p>
      </div>
    </Layout>
  );
};

export default Story;

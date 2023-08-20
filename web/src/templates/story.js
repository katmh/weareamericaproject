/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import StoryTags from "../components/StoryTags";
import BackToAll from "../components/BackToAll";
import Layout from "../components/Layout";
import LocationIcon from "../components/icons/Location";

const Story = ({ pageContext: { data } }) => {
  return (
    <Layout width="thin">
      <BackToAll name="stories" path="/stories" />
      <div className="story-info">
        <h1
          className="heading large_heading"
          sx={{
            mb: 1
          }}
        >
          {data.storyTitle}
        </h1>
        <p className="caption1" sx={{ mb: 4 }}>
          By {data.author}
        </p>
      </div>
      <img
        src={data.photo ? data.photo.asset.url : ""}
        alt={"Photo of" + data.Author}
        sx={{
          maxWidth: "100%"
        }}
      />

      <div
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >
        <LocationIcon
          width={20}
          height={20}
          sx={{
            path: {
              // fill: "red"
            }
          }}
        />
        <p className="caption1">
          {data.school.name}, {!!data.school.city && `${data.school.city}, `}
          {data.school.location}
        </p>
      </div>

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
            data.Second_Language_Audio ? data.secondLanguageAudio.asset.url : ""
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

      <div sx={{ mt: 4, mb: 5 }}>
        <PortableText value={data._rawText} />
        <p className="caption2">
          © {data.author}. All rights reserved. If you are interested in quoting
          this story, <Link to="/contact">contact</Link> the national team and
          we can put you in touch with the author’s teacher.
        </p>
      </div>

      <StoryTags tags={data.tags} />
    </Layout>
  );
};

export default Story;

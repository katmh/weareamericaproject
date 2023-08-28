/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import StoryTags from "../components/StoryTags";
import BackToAll from "../components/BackToAll";
import Layout from "../components/Layout";
import LocationIcon from "../components/icons/Location";

const Story = ({ pageContext: { data } }) => {
  const {
    storyTitle,
    author,
    photo,
    school,
    audio,
    secondLanguageAudio,
    _rawText,
    tags
  } = data;

  // Workaround: Sometimes people format stories with an extra newline between paragraphs,
  // so skip any blocks that consist of just a newline.
  const rawText = _rawText?.filter(block => block.children?.[0]?.text !== "\n");

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
          {storyTitle}
        </h1>
        <p className="caption1" sx={{ mb: 4 }}>
          By {author}
        </p>
      </div>
      <img
        src={photo?.asset?.url || ""}
        alt={author}
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
        <LocationIcon width={20} height={20} />
        <p className="caption1">
          {school.name}, {!!school.city && `${school.city}, `}
          {school.location}
        </p>
      </div>

      {!!audio?.asset && (
        <audio
          controls
          src={data.audio.asset.url}
          sx={{
            display: "block",
            my: 4
          }}
        >
          The audio player is not supported in your browser.
        </audio>
      )}

      {!!secondLanguageAudio && (
        <>
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
          <audio
            controls
            src={data.secondLanguageAudio.asset.url}
            sx={{
              display: "block",
              mt: 2,
              mb: 4
            }}
          >
            The audio player is not supported in your browser.
          </audio>
        </>
      )}

      <div sx={{ mt: 4, mb: 5 }}>
        <PortableText value={rawText} />
        <p className="caption2">
          © {author}. All rights reserved. If you are interested in quoting this
          story, <Link to="/contact">contact</Link> the national team and we can
          put you in touch with the author’s teacher.
        </p>
      </div>

      <StoryTags tags={tags} />
    </Layout>
  );
};

export default Story;

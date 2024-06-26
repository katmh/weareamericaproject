/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";
import slugify from "../../utils/slugify";

const StoryCard = ({ title, photoUrl, author }) => (
  <article
    sx={{
      mb: "30px",
      ":hover img": {
        transform: "scale(1.1)"
      }
    }}
  >
    <Link
      to={`/story/${slugify(title)}`}
      sx={{
        textDecoration: "none"
      }}
    >
      {photoUrl && (
        <div
          className="image-wrapper"
          sx={{
            overflow: "hidden"
          }}
        >
          <img
            src={photoUrl}
            alt={"Photo of " + author}
            sx={{
              maxWidth: "100%",
              m: "0",
              transition: ".15s",
              position: "relative",
              zIndex: "-1",
              display: "block"
            }}
          />
        </div>
      )}

      <div
        sx={{
          bg: "background",
          overflow: "hidden",
          p: ".75rem 1rem"
        }}
      >
        <h3
          sx={{
            fontFamily: "heading",
            color: "text",
            m: "0",
            fontSize: "1.5rem",
            display: "inline-block",
            lineHeight: 1.25
          }}
        >
          {title}
        </h3>

        <h4
          sx={{
            fontFamily: "heading",
            color: "muted",
            margin: "0",
            fontSize: "1.25rem"
          }}
        >
          {author}
        </h4>
      </div>
    </Link>
  </article>
);

export default StoryCard;

export const query = graphql`
  fragment StoryCardInformation on SanityStory {
    id
    authorFirstName
    storyTitle
    photo {
      asset {
        url
      }
    }
  }
`;

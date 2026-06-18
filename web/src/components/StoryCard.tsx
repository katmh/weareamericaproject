/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as slugUtils from "../../utils/slugify";

const StoryCard = ({ title, photo, author, slug }) => {
  const storyPath = slugUtils.getStoryPath({
    slug,
    storyTitle: title,
    authorFirstName: author
  });
  const image = photo?.asset ? getImage(photo.asset) : null;

  return (
    <article
      sx={{
        mb: "30px",
        ":hover img": {
          transform: "scale(1.1)"
        }
      }}
    >
      <Link
        to={storyPath}
        sx={{
          textDecoration: "none"
        }}
      >
        {image && (
          <div
            className="image-wrapper"
            sx={{
              overflow: "hidden"
            }}
          >
            <GatsbyImage
              image={image}
              alt={`Photo of ${author}`}
              sx={{
                transition: ".15s",
                position: "relative",
                zIndex: "-1"
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
};

export default StoryCard;

export const query = graphql`
  fragment StoryCardInformation on SanityStory {
    id
    authorFirstName
    storyTitle
    slug
    photo {
      asset {
        id
        url
        metadata {
          dimensions {
            height
            width
          }
        }
        gatsbyImageData
      }
    }
  }
`;

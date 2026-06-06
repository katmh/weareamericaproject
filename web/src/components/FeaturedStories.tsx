import { useStaticQuery, graphql } from "gatsby";
import React, { useState, useEffect } from "react";
import Gallery from "./Gallery";
import StoryCard from "../components/StoryCard";

/** Randomly shuffle an array with Fisher-Yates, see https://stackoverflow.com/a/12646864. */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const FeaturedStories = ({ nCols, nStories }) => {
  const data = useStaticQuery(graphql`
    query featuredStoriesQuery {
      allSanityStory(
        filter: { isHidden: { ne: true }, isFeatured: { eq: true } }
      ) {
        nodes {
          id
          authorFirstName
          storyTitle
          photo {
            asset {
              url
            }
          }
        }
      }
    }
  `);

  const [stories, updateStories] = useState([]);

  useEffect(() => {
    let stories = data.allSanityStory.nodes;
    shuffleArray(stories);
    const randomN = stories.slice(0, nStories);
    updateStories(randomN);
  }, []);

  return (
    <Gallery n={nCols}>
      {stories.map(story => (
        <StoryCard
          key={story.id}
          title={story.storyTitle}
          photoUrl={story.photo.asset?.url}
          author={story.authorFirstName}
        />
      ))}
    </Gallery>
  );
};

export default FeaturedStories;

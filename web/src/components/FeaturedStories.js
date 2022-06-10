import Gallery from "./Gallery";
import StoryCard from "../components/StoryCard";
import { useStaticQuery, graphql } from "gatsby";
import React from "react";

const FeaturedStories = ({ nCols }) => {
  const data = useStaticQuery(graphql`
    {
      allAirtable(
        filter: { data: { Featured: { eq: true } } }
        sort: { order: DESC, fields: id }
        limit: 6
      ) {
        nodes {
          id
          data {
            Author
            Status
            Story_Name
            Photo_URL
            Photo {
              thumbnails {
                large {
                  url
                }
              }
            }
            Audio {
              url
            }
            School
            Tags
            Grade
          }
        }
      }
    }
  `);

  const stories = data.allAirtable.nodes;
  return (
    <Gallery n={nCols}>
      {stories.map(story => (
        <StoryCard
          key={story.id}
          title={story.data.Story_Name}
          photoUrl={
            story.data.Photo_URL ?? story.data.Photo[0].thumbnails.large.url
          }
          author={story.data.Author}
          audio={story.data.Audio ? story.data.Audio[0].url : ""}
        />
      ))}
    </Gallery>
  );
};

export default FeaturedStories;

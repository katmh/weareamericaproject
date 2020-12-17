import Gallery from "./Gallery"
import StoryCard from "../components/StoryCard"
import { StaticQuery, graphql } from "gatsby"
import React from "react"

const FeaturedStories = props => (
  <StaticQuery
    query={graphql`
      {
        allAirtable(filter: { data: { Featured: { eq: true } } }) {
          edges {
            node {
              id
              data {
                Author
                Status
                Story_Name
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
                Transcript
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Gallery n={props.nCols}>
        {data.allAirtable.edges.slice(0, 6).map(story => (
          <StoryCard
            key={story.node.id}
            title={story.node.data.Story_Name}
            photoUrl={story.node.data.Photo[0].thumbnails.large.url}
            author={story.node.data.Author}
            audio={story.node.data.Audio ? story.node.data.Audio[0].url : ""}
          />
        ))}
      </Gallery>
    )}
  />
)

export default FeaturedStories

import Gallery from "./Gallery"
import StoryCard from "../components/StoryCard"
import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"

const FeaturedStories = ({ nCols, nStories }) => {
  const data = useStaticQuery(graphql`
    {
      allAirtable(
        filter: { data: { Featured: { eq: true } } }
        sort: { order: DESC, fields: id }
      ) {
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
            }
          }
        }
      }
    }
  `)

  const [stories, updateStories] = useState([])

  useEffect(() => {
    const stories = data.allAirtable.edges
    const randomN = stories
      .sort(() => Math.random() - Math.random())
      .slice(0, nStories)
    updateStories(randomN)
  }, [])

  return (
    <Gallery n={nCols}>
      {stories.map(story => (
        <StoryCard
          key={story.node.id}
          title={story.node.data.Story_Name}
          photoUrl={story.node.data.Photo[0].thumbnails.large.url}
          author={story.node.data.Author}
          audio={story.node.data.Audio ? story.node.data.Audio[0].url : ""}
        />
      ))}
    </Gallery>
  )
}

export default FeaturedStories

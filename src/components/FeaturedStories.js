import Gallery from './Gallery'
import StoryCard from '../components/StoryCard'
import { StaticQuery, graphql } from 'gatsby'
import React from 'react'

const FeaturedStories = (props) => (
    <StaticQuery
        query={graphql`
        {
            allAirtable(filter: {data: {Featured: {eq: true}}}) {
              edges {
                node {
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
        render={data => {
            const allFeaturedStories = data.allAirtable.edges
            const randomNStories = allFeaturedStories.sort( function() { return 0.5 - Math.random() } ).slice(0, props.nStories)
            console.log(randomNStories)
            return (
                <Gallery n={props.nCols}>
                {randomNStories.map(story => {
                    console.log(story.node.data.Photo[0].thumbnails.large.url)
                    console.log(story.node.data.Story_Name)
                    return (
                        <StoryCard
                            photoUrl={story.node.data.Photo[0].thumbnails.large.url}
                            title={story.node.data.Story_Name}
                            author={story.node.data.Author}
                            audio={story.node.data.Audio ? (story.node.data.Audio[0].url) : ''}
                        />
                    )
                })}
                </Gallery>
            )
        }}
    />
)

/*
(
    
)}
*/

export default FeaturedStories
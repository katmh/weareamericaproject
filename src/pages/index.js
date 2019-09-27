import React from "react"
import { graphql } from "gatsby"
import Header from "../components/Header"

const IndexPage = ({ data }) => (
    <>
        <Header />
        {data.allAirtable.edges.map((edge, i) => (
            <div>
                <h2>
                  {edge.node.data.Story_Name}
                </h2>
                <p>By {edge.node.data.Author}</p>
                <img alt={edge.node.data.Author} src={edge.node.data.Photo[0].url} />
            </div>
        ))}
    </>
)

export default IndexPage

export const query = graphql`
{
    allAirtable {
      edges {
        node {
          data {
            Audio {
              url
            }
            Author
            Photo {
              url
            }
            School_Class
            Story_Name
          }
        }
      }
    }
  }
`
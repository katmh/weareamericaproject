/** @jsx jsx */
import { graphql } from "gatsby"
import Header from "../components/Header"
import Gallery from "../components/Gallery"
import StoryCard from '../components/StoryCard'
import { jsx, ThemeProvider } from 'theme-ui'
import theme from "../components/theme"

const IndexPage = ({ data }) => (
    <ThemeProvider theme={theme}>
        <Header />
        <Gallery>
          {data.allAirtable.edges.map((edge, i) => (
              <StoryCard
                photoUrl={edge.node.data.Photo[0].url}
                title={edge.node.data.Story_Name}
                author={edge.node.data.Author}
              />
          ))}
        </Gallery>
    </ThemeProvider>
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
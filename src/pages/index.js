/** @jsx jsx */
import { graphql } from "gatsby"
import Header from "../components/Header"
import { jsx, ThemeProvider } from 'theme-ui'
import theme from "../components/theme"

const IndexPage = ({ data }) => (
    <ThemeProvider theme={theme}>
        <Header />
        {data.allAirtable.edges.map((edge, i) => (
            <div>
                <h2
                    sx={{
                        color: 'text',
                        fontFamily: 'body',
                    }}>
                    {edge.node.data.Story_Name}
                </h2>
                <p>By {edge.node.data.Author}</p>
                <img alt={edge.node.data.Author} src={edge.node.data.Photo[0].url} />
            </div>
        ))}
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
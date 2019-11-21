/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'

const News = ({ data }) => (
  <Layout>
    <h1
        sx={{
          fontSize: [4, 5],
          fontFamily: 'heading',
          fontWeight: '400',
          mb: 3,
          color: 'accent'
      }}
    >
      News
    </h1>
    {data.allMarkdownRemark.edges.map((edge) => (
      <BlogPost data={edge.node} />
    ))}
  </Layout>
)

export const query = graphql`
  query allBlogPosts {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
          }
          html
        }
      }
    }
  }  
`

export default News
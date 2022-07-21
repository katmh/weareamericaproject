import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import Gallery from "../components/Gallery";

const News = ({ data }) => (
  <Layout>
    <h1 className="heading large_heading">News</h1>
    <Gallery n={2}>
      {data.allMarkdownRemark.edges.map(edge => (
        <BlogPost data={edge.node} />
      ))}
    </Gallery>
  </Layout>
);

export const query = graphql`
  query allBlogPosts {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
`;

export default News;

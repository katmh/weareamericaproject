import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const News = ({ data }) => (
  <Layout>
    <h1 className="heading large_heading">In the News</h1>
    <section>
      {data.allSanityNewsItem.nodes.map(node => (
        <article key={node.url} className="news_item">
          <p className="news_item_date caption1">{node.date}</p>
          <h3>
            <a href={node.url} target="_blank" rel="noreferrer">
              {node.title}
            </a>
          </h3>
          <p className="news_item_who caption1">{node.who}</p>
        </article>
      ))}
    </section>
  </Layout>
);

export const query = graphql`
  query allNewsItems {
    allSanityNewsItem(sort: { fields: date, order: DESC }) {
      nodes {
        title
        who
        url
        date
      }
    }
  }
`;

export default News;

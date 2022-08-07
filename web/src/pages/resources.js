import React from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import Layout from "../components/Layout";

const ResourcesPage = ({ data }) => {
  const rawText = data.allSanityPage.nodes[0].content[0]._rawContent;
  return (
    <Layout>
      <h1 className="heading large_heading">Resources</h1>
      <PortableText value={rawText} />
    </Layout>
  );
};

export const query = graphql`
  query EducatorResourcesPageQuery {
    allSanityPage(filter: { title: { eq: "Educator Resources" } }) {
      nodes {
        id
        content {
          ... on SanityTextSection {
            _rawContent
          }
        }
      }
    }
  }
`;

export default ResourcesPage;

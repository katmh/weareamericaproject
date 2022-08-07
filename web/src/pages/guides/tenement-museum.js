import React from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import Layout from "../../components/Layout";

const TenementMuseumGuide = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const rawText = page.content[0]._rawContent;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={rawText} />
    </Layout>
  );
};

export const query = graphql`
  query TenementMuseumGuidePageQuery {
    allSanityPage(
      filter: { _id: { eq: "d904fbea-ed40-4a6c-8c81-98f5bc1511a8" } }
    ) {
      nodes {
        title
        content {
          ... on SanityTextSection {
            _rawContent
          }
        }
      }
    }
  }
`;

export default TenementMuseumGuide;

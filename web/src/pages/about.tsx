import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { PortableText } from "@portabletext/react";

const AboutPage = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const rawText = page.content[0]._rawContent;
  const partners = page.content[1].partners;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={rawText} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        {partners.map(partner => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="200"
              src={partner.logo.asset.url}
              alt={`${partner.name} logo`}
            />
          </a>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery {
    allSanityPage(
      filter: { _id: { eq: "9302c747-2e7f-464a-9be8-4aa1afda797a" } }
    ) {
      nodes {
        title
        _id
        content {
          ... on SanityPartnersSection {
            partners {
              name
              url
              logo {
                asset {
                  url
                }
              }
            }
          }
          ... on SanityTextSection {
            _rawContent
          }
        }
      }
    }
  }
`;

export default AboutPage;

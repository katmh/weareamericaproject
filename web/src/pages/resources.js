import React from "react";
import { graphql, Link } from "gatsby";
import { PortableText } from "@portabletext/react";

import ExternalLinkIcon from "../components/icons/ExternalLink";
import Layout from "../components/Layout";

const Guide = ({ guide }) => {
  const { url, path, title } = guide;
  return (
    <li>
      {url ? (
        <a className="guide_link" href={url}>
          <span>{title}</span>{" "}
          <span className="icon_container">
            <ExternalLinkIcon />
          </span>
        </a>
      ) : (
        <Link to={`/guides/${path}`}>{title}</Link>
      )}
    </li>
  );
};

const ResourcesPage = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const rawText = page.content[0]._rawContent;
  const guides = page.content[1].guides;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={rawText} />
      {guides && (
        <ul>
          {guides.map(guide => (
            <Guide key={guide.id} guide={guide} />
          ))}
        </ul>
      )}
    </Layout>
  );
};

export const query = graphql`
  query EducatorResourcesPageQuery {
    allSanityPage(
      filter: { _id: { eq: "d130afef-6556-4f93-a5d5-aa319f34616e" } }
    ) {
      nodes {
        title
        content {
          ... on SanityTextSection {
            _rawContent
          }
          ... on SanityGuidesSection {
            guides {
              id
              url
              path
              title
            }
          }
        }
      }
    }
  }
`;

export default ResourcesPage;

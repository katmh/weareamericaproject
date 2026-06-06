import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";

const ContactPage = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const rawText = page.content[0]._rawContent;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={rawText} />
      <form action="https://formspree.io/f/xnqoojjv" method="POST">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" />

        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />

        <label htmlFor="message">Message: </label>
        <textarea name="message" id="message"></textarea>

        <br />
        <button>Submit</button>
      </form>
    </Layout>
  );
};

export const query = graphql`
  query ContactPageQuery {
    allSanityPage(
      filter: { _id: { eq: "075b0657-22f1-4d62-bc24-51a3e407e114" } }
    ) {
      nodes {
        title
        _id
        content {
          ... on SanityTextSection {
            _rawContent
          }
        }
      }
    }
  }
`;

export default ContactPage;

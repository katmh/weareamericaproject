import React from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";

import Book from "../components/Book";
import Container from "../components/Container";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";

const BooksPage = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const rawText = page.content[0]._rawContent;
  const books = page.content[1].books;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={rawText} />
      <br />
      <Container width="thin">
        <Gallery n={2}>
          {books.map(book => {
            return (
              <Book
                key={book.title}
                title={book.title}
                image={book.photo.asset.url}
                url={book.url}
              />
            );
          })}
        </Gallery>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query BooksPageQuery {
    allSanityPage(
      filter: { _id: { eq: "64cc6c59-77ab-4b00-92cd-f06bf7625ab5" } }
    ) {
      nodes {
        title
        content {
          ... on SanityTextSection {
            _rawContent
          }
          ... on SanityBooksSection {
            books {
              title
              url
              photo {
                asset {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BooksPage;

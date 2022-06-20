/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import Dropdown from "../components/Dropdown";
import StoryCard from "../components/StoryCard";
import SearchText from "../components/SearchText";
import PaginationControls from "../components/PaginationControls";

const UnfilteredStoriesPage = ({
  data,
  pageContext: { currentPage, numPages }
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/stories" : `../${(currentPage - 1).toString()}`;
  const nextPage =
    currentPage === 1 ? "page/2" : `../${(currentPage + 1).toString()}`;

  const stories = data.stories.edges;
  return (
    <Layout>
      <h1
        sx={{
          fontSize: [4, 5],
          fontFamily: "heading",
          fontWeight: "400",
          color: "accent"
        }}
      >
        Library of Stories
      </h1>
      <SearchText />
      <Dropdown content={data.tags} contentName="Topic" contentSlug="tag" />
      <Dropdown content={data.states} contentName="State" contentSlug="state" />
      <Dropdown
        content={data.schools}
        contentName="School"
        contentSlug="school"
      />
      <br />
      <br />
      <PaginationControls
        currentPage={currentPage}
        numPages={numPages}
        prevPage={!isFirstPage ? prevPage : ""}
        nextPage={!isLastPage ? nextPage : ""}
      />
      <br />
      <Gallery n={3}>
        {stories.map(node => {
          const story = node.node.data;
          return (
            <StoryCard
              key={node.id}
              author={story.Author}
              title={story.Story_Name}
              photoUrl={story.Photo[0].thumbnails.large.url}
            />
          );
        })}
      </Gallery>
      <center>
        <PaginationControls
          currentPage={currentPage}
          numPages={numPages}
          prevPage={!isFirstPage ? prevPage : ""}
          nextPage={!isLastPage ? nextPage : ""}
        />
      </center>
    </Layout>
  );
};

export default UnfilteredStoriesPage;

export const query = graphql`
  query UnfilteredStoriesPageQuery($skip: Int!, $limit: Int!) {
    stories: allAirtable(
      filter: {
        table: { eq: "Stories" }
        data: { Status: { eq: "Published" } }
      }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          data {
            ...StoryCardInformation
          }
        }
      }
    }

    tags: allAirtable(
      filter: {
        table: { eq: "Stories" }
        data: { Status: { eq: "Published" } }
      }
    ) {
      group(field: data___Tags) {
        fieldValue
      }
    }
    states: allAirtable(
      filter: {
        table: { eq: "Stories" }
        data: { Status: { eq: "Published" } }
      }
    ) {
      group(field: data___State) {
        fieldValue
      }
    }
    schools: allAirtable(
      filter: {
        table: { eq: "Stories" }
        data: { Status: { eq: "Published" } }
      }
    ) {
      group(field: data___School) {
        fieldValue
      }
    }
  }
`;

/** @jsx jsx */
import Layout from "../components/Layout";
import StoryCard from "../components/StoryCard";
import Gallery from "../components/Gallery";
import { graphql } from "gatsby";
import { jsx } from "theme-ui";
import Dropdown from "../components/Dropdown";
import SearchText from "../components/SearchText";

const StoriesPage = ({ data }) => {
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
      <br />
      <Gallery n={3}>
        {data.stories.nodes.map(story => (
          <StoryCard
            key={story.id}
            id={story.id}
            photoUrl={
              story.data.Photo_URL
                ? story.data.Photo[0].thumbnails.large.url
                : ""
            }
            title={story.data.Story_Name}
            author={story.data.Author}
          />
        ))}
      </Gallery>
    </Layout>
  );
};

export default StoriesPage;

export const pageQuery = graphql`
  query {
    stories: allAirtable(
      filter: {
        table: { eq: "Stories" }
        data: { Status: { eq: "Published" } }
      }
    ) {
      nodes {
        id
        data {
          Author
          Story_Name
          Photo_URL
          Photo {
            thumbnails {
              large {
                url
              }
            }
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

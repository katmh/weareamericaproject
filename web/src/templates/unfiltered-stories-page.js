import React from "react";
import { graphql } from "gatsby";
import Dropdown from "../components/Dropdown";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import PaginationControls from "../components/PaginationControls";
import SearchText from "../components/SearchText";
import StoryCard from "../components/StoryCard";

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

  const stories = data.stories.nodes;
  return (
    <Layout>
      <h1 className="heading large_heading">Library of Stories</h1>
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
        {stories.map(story => {
          return (
            <StoryCard
              key={story.id}
              author={story.author}
              title={story.storyTitle}
              photoUrl={story.photo.asset.url}
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
    stories: allSanityStory(
      filter: { isHidden: { ne: true } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...StoryCardInformation
      }
    }

    tags: allSanityStory(filter: { isHidden: { ne: true } }) {
      group(field: tags) {
        fieldValue
      }
    }
    states: allSanityStory(filter: { isHidden: { ne: true } }) {
      group(field: school___location) {
        fieldValue
      }
    }
    schools: allSanityStory(filter: { isHidden: { ne: true } }) {
      group(field: school___name) {
        fieldValue
      }
    }
  }
`;

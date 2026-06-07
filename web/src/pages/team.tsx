import React from "react";
import { graphql } from "gatsby";

import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import PersonCard from "../components/PersonCard";

const TeamMembersPage = ({ data }) => {
  const members = data.allSanityTeamMember.nodes;
  const active = members
    .filter(member => member.isInactive !== true)
    .sort((a, b) => {
      if (a.showLower === b.showLower) {
        return 0;
      }
      // return a value >0 to sort a after b
      return a.showLower ? 1 : -1;
    });
  const inactive = members.filter(member => member.isInactive);
  return (
    <Layout>
      <h1 className="heading large_heading">Meet our team</h1>
      <Gallery masonry={false} n={5}>
        {active.map(person => {
          return (
            <PersonCard
              key={person._id}
              photoUrl={person.photo.asset.url}
              name={person.name}
              title={person.role}
              bio={person._rawBio}
              story={person.story}
            />
          );
        })}
      </Gallery>
      {inactive && (
        <section>
          <h2 className="heading small_heading">Former team members</h2>
          <Gallery masonry={false} n={5}>
            {inactive.map(person => {
              return (
                <PersonCard
                  key={person._id}
                  photoUrl={person.photo.asset.url}
                  name={person.name}
                  title={person.role}
                  bio={person._rawBio}
                  story={person.story}
                />
              );
            })}
          </Gallery>
        </section>
      )}
    </Layout>
  );
};

export default TeamMembersPage;

export const pageQuery = graphql`
  query TeamMembersQuery {
    allSanityTeamMember {
      nodes {
        _id
        name
        role
        photo {
          asset {
            url
          }
        }
        _rawBio
        showLower
        isInactive
        story {
          authorFirstName
          storyTitle
        }
      }
    }
  }
`;

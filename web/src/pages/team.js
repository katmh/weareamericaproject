/** @jsx jsx */

import { graphql } from "gatsby";
import { jsx } from "theme-ui";

import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import PersonCard from "../components/PersonCard";

const TeamMembersPage = ({ data }) => {
  const teamMembers = data.allSanityTeamMember.nodes;
  const showLower = teamMembers.filter(member => member.showLower);
  const teamMembersOrdered = teamMembers
    .filter(member => !member.showLower)
    .concat(showLower);
  return (
    <Layout>
      <h1 className="heading large_heading">Meet our team</h1>
      <Gallery masonry={false} n={5}>
        {teamMembersOrdered.map(person => {
          return (
            person.photo && (
              <PersonCard
                key={person._id}
                photoUrl={person.photo.asset.url}
                name={person.name}
                title={person.role}
                bio={person._rawBio}
              />
            )
          );
        })}
      </Gallery>
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
      }
    }
  }
`;

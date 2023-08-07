import React from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";

import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import PersonCard from "../components/PersonCard";

const Teachers = ({ data }) => {
  const page = data.allSanityPage.nodes[0];
  const content = page.content[0]._rawContent;
  // const states = data.allSanitySchool.distinct;
  return (
    <Layout>
      <h1 className="heading large_heading">{page.title}</h1>
      <PortableText value={content} />
      <br />
      {data.allSanityTeacher.group.reverse().map(cohort => {
        return (
          <section key={cohort.fieldValue}>
            <h2 className="heading small_heading">{cohort.fieldValue}</h2>
            <Gallery masonry={false} n={5}>
              {cohort.nodes.map(teacher => {
                return (
                  <PersonCard
                    key={teacher.name}
                    photoUrl={teacher.photo.asset.url}
                    name={teacher.name}
                    school={teacher.school.name}
                    location={teacher.school.location}
                    bio={teacher.bio}
                  />
                );
              })}
            </Gallery>
          </section>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query TeachersQuery {
    allSanityPage(
      filter: { _id: { eq: "620acce4-5b3b-4583-a141-c3f9c69b0b0a" } }
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
    allSanitySchool(sort: { fields: location }) {
      distinct(field: location)
    }
    allSanityTeacher {
      group(field: cohort) {
        fieldValue
        nodes {
          name
          school {
            name
            location
          }
          bio
          photo {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

export default Teachers;

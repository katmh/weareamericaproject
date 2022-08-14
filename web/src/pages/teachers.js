import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import PersonCard from "../components/PersonCard";
// import Map from "../components/Map";

const Teachers = ({ data }) => {
  return (
    <Layout>
      <h1 className="heading large_heading">Teachers</h1>
      <p>
        Learn more about our 50 teachers and classrooms across 34 states. TODO
      </p>
      {/* <Map /> */}
      <br />
      {data.allSanityTeacher.group.reverse().map(cohort => {
        return (
          <section key={cohort.fieldValue}>
            <h2 className="heading small_heading">{cohort.fieldValue}</h2>
            <Gallery n={5}>
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

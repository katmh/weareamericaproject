/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Gallery from "../components/Gallery"
import PersonCard from "../components/PersonCard"
import Map from "../components/Map"

const Teachers = ({ data }) => {
  const numTeachers = data.allAirtable.edges.length
  const states = data.allAirtable.edges.map((edge) => edge.node.data.State)
  const cleaned = states.filter((state) => state !== null)
  const unique = cleaned.filter((state, i, arr) => arr.indexOf(state) === i)
  const numStates = unique.length
  return (
    <Layout>
      <h1
        sx={{
          fontSize: [4, 5],
          fontFamily: "heading",
          fontWeight: "400",
          color: "accent",
        }}
      >
        Teachers
      </h1>
      <p
        sx={{
          color: "text",
          fontFamily: "body",
          fontSize: [0, 1],
          fontWeight: 300,
          lineHeight: ["135%", "145%"],
          mt: 3,
          mb: 4,
        }}
      >
        Learn more about our {numTeachers || "50"} teachers and classrooms
        across {numStates || "34"} states.
      </p>
      <Map />
      <br />
      <Gallery n={4}>
        {data.allAirtable.edges.map((edge) => {
          const person = edge.node.data
          return (
            person.Picture && (
              <PersonCard
                key={person.Name}
                photoUrl={person.Picture[0].thumbnails.large.url}
                name={person.Name}
                school={person.School_Name}
                city={person.City}
                state={person.State}
                bio={person.Bio}
              />
            )
          )
        })}
      </Gallery>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TeachersPageQuery {
    allAirtable(filter: { table: { eq: "Teachers" } }) {
      edges {
        node {
          data {
            Name
            School_Name
            City
            State
            Bio
            Picture {
              thumbnails {
                large {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Teachers

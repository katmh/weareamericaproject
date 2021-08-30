/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

const Map = () => {
  const data = useStaticQuery(graphql`
    {
      allAirtable {
        edges {
          node {
            data {
              State
            }
          }
        }
      }
    }
  `)
  const states = data.allAirtable.edges.map((edge) => edge.node.data.State)
  console.log(states)
  const cleaned = states.filter((state) => state !== null)
  const unique = cleaned.filter((state, i, arr) => arr.indexOf(state) === i)
  unique.sort()

  return (
    <div>
      <p>hi</p>
    </div>
  )
}

export default Map

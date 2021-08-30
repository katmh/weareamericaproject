/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import { SVGMap } from "react-svg-map"
import USA from "@svg-maps/usa"
import "./Map.css"

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
  const cleaned = states.filter((state) => state !== null)
  const unique = cleaned.filter((state, i, arr) => arr.indexOf(state) === i)
  unique.sort()

  const getLocationClassName = (location) =>
    `state ${unique.includes(location.name) && "active"}`

  return (
    <div>
      <SVGMap map={USA} locationClassName={getLocationClassName} />
    </div>
  )
}

export default Map

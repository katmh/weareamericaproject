/** @jsx jsx */
import { useState } from "react"
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

  const [tooltip, setTooltip] = useState({
    pointedLocation: null,
    style: {
      display: "none",
    },
  })

  const getLocationClassName = (location) =>
    `state${unique.includes(location.name) ? " active" : ""}`

  const handleLocationMouseOver = (e) =>
    setTooltip({ ...tooltip, pointedLocation: e.target.attributes.name.value })

  const handleLocationMouseOut = () => {
    setTooltip({
      pointedLocation: null,
      style: {
        display: "none",
      },
    })
  }

  const handleLocationMouseMove = (e) => {
    console.log(e.clientY, e.clientX)
    setTooltip({
      ...tooltip,
      style: {
        display: "block",
        top: e.clientY + 15,
        left: e.clientX,
      },
    })
  }

  return (
    <div>
      <SVGMap
        map={USA}
        locationClassName={getLocationClassName}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseMove={handleLocationMouseMove}
        onLocationMouseOut={handleLocationMouseOut}
      />
      <div className="tooltip" style={tooltip.style}>
        {tooltip.pointedLocation}
      </div>
    </div>
  )
}

export default Map

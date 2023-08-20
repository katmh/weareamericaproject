/** @jsx jsx */
import { jsx } from "theme-ui";
import { SVGMap } from "react-svg-map";
import USA from "@svg-maps/usa";
import "./Map.css";
import { graphql, useStaticQuery } from "gatsby";

const Map = () => {
  const data = useStaticQuery(graphql`
    query StatesQuery {
      allSanitySchool {
        distinct(field: location)
      }
    }
  `);
  const states = data.allSanitySchool.distinct;

  const getLocationClassName = location =>
    `state ${states.includes(location.name) && "active"}`;

  return (
    <div className="map_container">
      <SVGMap map={USA} locationClassName={getLocationClassName} />
      <p className="caption2 map_caption">
        The We Are America Project has been in classrooms all across the country
        and beyond.
      </p>
    </div>
  );
};

export default Map;

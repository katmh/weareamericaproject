/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const BackToAll = ({ name, path }) => (
  <p
    sx={{
      mb: 4
    }}
    className="caption1"
  >
    <Link
      to={path}
      sx={{
        display: "inline-block",
        color: "#555",
        textDecoration: "none",
        pb: "0.5px",
        borderBottom: "1px solid #777",
        transition: ".15s",
        ":hover": {
          color: "#777",
          borderBottom: "1px solid #999"
        }
      }}
    >
      ← Back to all {name}
    </Link>
  </p>
);

export default BackToAll;

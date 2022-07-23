/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const BackToAll = ({ name, path }) => (
  <p
    sx={{
      mb: 4
    }}
  >
    <Link
      to={path}
      sx={{
        display: "inline-block",
        color: "#444",
        textDecoration: "none",
        pb: "1px",
        borderBottom: "1px solid #999",
        transition: ".15s",
        ":hover": {
          borderBottom: "1px solid #666"
        }
      }}
    >
      ← Back to all {name}
    </Link>
  </p>
);

export default BackToAll;

/** @jsx jsx */
import { jsx } from "theme-ui";

const Heading = ({ children }) => {
  return (
    <h1
      sx={{
        fontSize: [4, 5],
        fontFamily: "heading",
        fontWeight: "400",
        color: "accent",
        mb: 4
      }}
    >
      {children}
    </h1>
  );
};

export default Heading;

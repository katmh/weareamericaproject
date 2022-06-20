/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const PaginationControls = ({
  prevPage = "",
  nextPage = "",
  currentPage,
  numPages
}) => {
  return (
    <div
      sx={{
        fontFamily: "body",
        color: "text"
      }}
    >
      {prevPage && <Link to={prevPage}>Previous</Link>} Page {currentPage} of{" "}
      {numPages} {nextPage && <Link to={nextPage}>Next</Link>}
    </div>
  );
};

export default PaginationControls;

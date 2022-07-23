import React from "react";
import { Link } from "gatsby";

const PaginationControls = ({
  prevPage = "",
  nextPage = "",
  currentPage,
  numPages
}) => {
  return (
    <p className="caption1">
      {prevPage && <Link to={prevPage}>Previous</Link>} Page {currentPage} of{" "}
      {numPages} {nextPage && <Link to={nextPage}>Next</Link>}
    </p>
  );
};

export default PaginationControls;

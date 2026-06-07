/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";
import SearchIcon from "../components/icons/Search";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const handleClick = e => {
    e.preventDefault();
    window.open(
      `https://google.com/search?q=${encodeURIComponent(
        "site:weareamericaproject.com " + query
      )}`,
      "_blank",
      "noreferrer"
    );
  };
  return (
    <form id="search_form">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for stories"
      />
      <button onClick={handleClick}>
        <SearchIcon id="search_icon" />
      </button>
    </form>
  );
};

export default SearchBar;

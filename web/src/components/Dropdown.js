/** @jsx jsx */
import { jsx } from "theme-ui";
import slugify from "../../utils/slugify";

const Dropdown = ({ content, contentName, contentSlug }) => {
  const options = content.group.map(({ fieldValue }) => fieldValue);
  return (
    <div className="dropdown">
      <label htmlFor={contentName}>{contentName}</label>
      <select
        id={contentName}
        onChange={e => {
          if (typeof window !== undefined && e.target.value !== "All") {
            window.location.pathname = `/${contentSlug}/${slugify(
              e.target.value
            )}`;
          }
        }}
      >
        <div className="select_content"></div>
        <option value="All">All</option>
        {options
          .filter(option => option.length)
          .map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;

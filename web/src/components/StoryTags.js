/** @jsx jsx */
import { jsx } from "theme-ui";
import slugify from "../../utils/slugify";
import { Link } from "gatsby";

const StoryTags = ({ tags }) => {
  if (!tags || !tags.length) {
    return;
  }

  return (
    <ul>
      <p
        sx={{
          display: "inline-block",
          lineHeight: 1,
          my: 0,
          fontWeight: "700",
          mr: 2
        }}
      >
        Tags:
      </p>
      {tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  );
};

const Tag = ({ tag }) => {
  return (
    <li
      key={slugify(tag)}
      sx={{
        listStyle: "none",
        display: "inline-block",
        mr: 1,
        my: 0,
        ml: 0
      }}
    >
      <Link
        to={"/tag/" + slugify(tag)}
        sx={{
          fontFamily: "body",
          lineHeight: "100%",
          textDecoration: "none",
          bg: "accent",
          color: "background",
          p: ".4rem .6rem",
          borderRadius: ".3rem",
          fontSize: 0,
          fontWeight: "700",
          transition: ".1s",
          display: "inline-block",
          my: ".15rem",
          ":hover": {
            color: "#fff",
            background: "#844"
          }
        }}
      >
        {tag}
      </Link>
    </li>
  );
};

export default StoryTags;

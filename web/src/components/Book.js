/** @jsx jsx */
import { jsx } from "theme-ui";
// import ButtonLink from "../components/ButtonLink";

const Book = ({ title, image }) => {
  return (
    <article>
      {/* <a href={url}> */}
      <img
        src={image}
        alt={"Cover of " + title}
        sx={{
          maxWidth: "100%",
          mb: 3
        }}
      />
      {/* </a> */}
      {/* <center>
        <ButtonLink destination={url}>
          Buy <i>{title}</i>
        </ButtonLink>
      </center> */}
    </article>
  );
};

export default Book;

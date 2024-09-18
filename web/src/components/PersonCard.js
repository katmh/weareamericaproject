/** @jsx jsx */
import { jsx } from "theme-ui";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React from "react";
import { Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import { getStorySlug } from "../../utils/slugify";
import X from "../components/icons/X";

const PersonCard = props => {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const storySlug = getStorySlug(props.story.storyTitle, props.name);

  return (
    <>
      <article
        onClick={props.bio ? open : () => {}}
        sx={{
          mb: 4,
          overflow: "auto",
          cursor: "pointer",
          p: {
            fontFamily: "body",
            fontSize: 0,
            lineHeight: "140%",
            mt: 1,
            mb: 2
          },
          ":hover img": {
            transform: "scale(1.1)"
          }
        }}
      >
        <div
          className="image-wrapper"
          sx={{
            overflow: "hidden"
          }}
        >
          <img
            src={props.photoUrl}
            alt={"Photo of " + props.name}
            sx={{
              maxWidth: "100%",
              float: ["left", "none"],
              mr: [3, 0],
              mb: [2, 0],
              transition: ".15s",
              position: "relative",
              zIndex: "-1",
              display: "block"
            }}
          />
        </div>

        <div
          sx={{
            zIndex: "1"
          }}
        >
          <h4
            sx={{
              fontFamily: "heading",
              fontSize: "1.5rem",
              fontWeight: 1.25,
              color: "text",
              pt: ".85rem",
              mb: ".25rem",
              lineHeight: "100%",
              pointer: "cursor",
              clear: "both"
            }}
          >
            {props.name}
          </h4>
          <p className="caption1">
            {props.title ? props.title : ""}
            {props.school ? props.school.trim() : ""}
            {props.location ? ` (${props.location})` : ""}
          </p>
          {props.story && (
            <p className="caption1">
              Story:{" "}
              <Link to={`/story/${storySlug}`}>{props.story.storyTitle}</Link>
            </p>
          )}
        </div>
      </article>

      <Dialog aria-label="announcement" isOpen={showDialog} onDismiss={close}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "top"
          }}
        >
          <h4 className="title">{props.name}</h4>
          <button onClick={close} className="modal_close">
            <X />
          </button>
        </div>
        {Array.isArray(props.bio) ? (
          <PortableText value={props.bio} />
        ) : (
          <p className="caption1">{props.bio}</p>
        )}
      </Dialog>
    </>
  );
};

export default PersonCard;

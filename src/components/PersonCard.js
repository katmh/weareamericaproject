/** @jsx jsx */
import { jsx } from "theme-ui"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import React from "react"

const PersonCard = props => {
  const [showDialog, setShowDialog] = React.useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      <article
        onClick={open}
        sx={{
          mb: 4,
          overflow: "auto",
          cursor: "pointer",
          p: {
            fontFamily: "body",
            fontSize: 0,
            lineHeight: "140%",
            mt: 1,
            mb: 2,
          },
          ":hover img": {
            transform: "scale(1.1)",
          },
        }}
      >
        <div
          className="image-wrapper"
          sx={{
            overflow: "hidden",
          }}
        >
          <img
            src={props.photoUrl}
            alt={"Photo of " + props.name}
            sx={{
              maxWidth: ["35%", "100%"],
              float: ["left", "none"],
              mr: [3, 0],
              mb: [2, 0],
              transition: ".15s",
              position: "relative",
              zIndex: "-1",
              display: "block",
            }}
          />
        </div>

        <div
          sx={{
            zIndex: "1",
            background: "#fff",
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
              clear: "both",
            }}
          >
            {props.name}
          </h4>
          <p
            sx={{
              mt: "0 !important",
              fontSize: "1.25rem",
              fontFamily: "heading",
              color: "muted",
            }}
          >
            {props.title ? props.title : ""}
            {props.school ? props.school : ""}
            {props.city ? ", " + props.city : ""}
            {props.state ? ", " + props.state : ""}
          </p>
        </div>
      </article>

      <Dialog
        aria-label="announcement"
        sx={{}}
        isOpen={showDialog}
        onDismiss={close}
      >
        <button
          onClick={close}
          sx={{
            cursor: "pointer",
            float: "right",
            fontFamily: "Arial, sans-serif",
            fontSize: 1,
            lineHeight: "100%",
            color: "text",
            transition: ".1s",
            appearance: "none",
            border: "none",
            ":hover": {
              color: "#444",
            },
          }}
        >
          x
        </button>

        <h4
          sx={{
            fontFamily: "heading",
            fontSize: 3,
            fontWeight: 44,
            color: "text",
          }}
        >
          {props.name}
        </h4>
        <div>
          <p
            sx={{
              fontFamily: "body",
              lineHeight: "135%",
              mt: 2,
              fontSize: 0,
              color: "text",
            }}
          >
            {props.bio}
          </p>
        </div>
      </Dialog>
    </>
  )
}

export default PersonCard

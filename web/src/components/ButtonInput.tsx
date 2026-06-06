/** @jsx jsx */
import { jsx } from "theme-ui"

const FONT_SIZES = {
  small: 1,
  medium: 2,
  large: 3,
}

const ButtonInput = (props) => (
  <input
    sx={{
      appearance: "none",
      border: "none",
      cursor: "pointer",
      verticalAlign: "bottom",
      bg: "accent",
      color: "background",
      display: "inline-block",
      mx: "auto",
      p: ".55em .65em .45em",
      textDecoration: "none",
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: props.size ? FONT_SIZES[props.size] : 1,
      lineHeight: "100%",
      transition: ".2s",
      borderRadius: "10px",
      outline: "none",
      ":hover": {
        bg: "#422",
      },
    }}
    type={props.type}
    value={props.value}
  />
)

export default ButtonInput

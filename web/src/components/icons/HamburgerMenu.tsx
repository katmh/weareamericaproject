import * as React from "react";

const HamburgerMenu = props => (
  <svg width={48} height={48} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M41 14H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4ZM41 26H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4ZM41 38H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4Z"
      fill="#000"
    />
  </svg>
);

export default HamburgerMenu;

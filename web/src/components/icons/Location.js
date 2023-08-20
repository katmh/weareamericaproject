import * as React from "react";
const SvgLocation = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="-4 0 32 32"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-8a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 22c-1.663.009-10-12.819-10-17C2 6.478 6.477 2 12 2s10 4.478 10 10c0 4.125-8.363 17.009-10 17Zm0-29C5.373 0 0 5.373 0 12c0 5.018 10.005 20.011 12 20 1.964.011 12-15.05 12-20 0-6.627-5.373-12-12-12Z"
    />
  </svg>
);
export default SvgLocation;

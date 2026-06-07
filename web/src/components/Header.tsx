import React from "react";
import { Link } from "gatsby";
import Nav from "./Nav";

const Header = () => (
  <header>
    <h1>
      <Link to="/" className="logo">
        We Are America
      </Link>
    </h1>
    <Nav />
  </header>
);

export default Header;

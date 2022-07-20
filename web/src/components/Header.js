import React from "react";
import { Link } from "gatsby";
import Nav from "./Nav";
import "../styles/components/header.scss";

const Header = () => (
  <header>
    <h1>
      <Link to="/">We Are America</Link>
    </h1>
    <Nav />
  </header>
);

export default Header;

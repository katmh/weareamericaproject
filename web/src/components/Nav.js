import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const query = graphql`
  {
    site {
      siteMetadata {
        navLinks {
          name
          path
        }
      }
    }
  }
`;

const Nav = () => {
  const data = useStaticQuery(query);
  const { navLinks } = data.site.siteMetadata;

  return (
    <nav>
      {navLinks.map(link => {
        return (
          <Link key={link.path} to={link.path}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;

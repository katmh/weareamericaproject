import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import "../styles/components/nav.scss";

const query = graphql`
  query NavItemsQuery {
    sanitySiteSettings {
      navItems {
        isEmphasized
        title
        path
        subItems {
          title
          path
        }
      }
    }
  }
`;

const Nav = () => {
  const data = useStaticQuery(query);
  const { navItems } = data.sanitySiteSettings;

  return (
    <nav>
      {navItems.map(item => {
        return (
          <Link
            key={item.path}
            to={`/${item.path}`}
            className={item.isEmphasized ? "emphasized" : ""}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;

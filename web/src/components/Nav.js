import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import ChevronDown from "../components/icons/ChevronDown";
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

/*
nav
  div.top_level_item [hover to make submenu appear]
    a (gatsby <Link />)
      span
      (chevron)
    div.submenu [display: none]
      a.submenu_item
*/

const Nav = () => {
  const data = useStaticQuery(query);
  const { navItems } = data.sanitySiteSettings;

  return (
    <nav>
      {navItems.map(item => {
        const hasSubmenu = item.subItems.length > 0;
        return (
          <div key={item.path} className="top_level_item">
            <Link
              key={item.path}
              to={`/${item.path}`}
              className={item.isEmphasized ? " emphasized" : ""}
            >
              <span>{item.title}</span>
              {hasSubmenu && <ChevronDown className="chevron" />}
            </Link>
            {hasSubmenu && (
              <div className="submenu">
                {item.subItems.map(subitem => (
                  <Link key={subitem.path} to={`/${subitem.path}`}>
                    {subitem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Nav;

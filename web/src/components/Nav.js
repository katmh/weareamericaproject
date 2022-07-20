import React, { useState } from "react";
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

const Nav = () => {
  const data = useStaticQuery(query);
  const { navItems } = data.sanitySiteSettings;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <nav>
      <div className="mobile_only hamburger" onClick={toggleNav}>
        ☰
      </div>

      <div
        className={`mobile_only overlay${isNavOpen ? " overlay_open" : ""}`}
        onClick={toggleNav}
      />

      <div
        className={`items_container${isNavOpen ? " items_container_open" : ""}`}
      >
        <div className="mobile_only close_nav_button" onClick={toggleNav}>
          x
        </div>
        {navItems.map(item => {
          const hasSubmenu = item.subItems.length > 0;
          return (
            <div key={item.path} className="top_level_item">
              <Link
                key={item.path}
                to={`/${item.path}`}
                className={item.isEmphasized ? " emphasized" : ""}
                activeClassName="active"
              >
                <span>{item.title}</span>
                {hasSubmenu && <ChevronDown className="chevron desktop_only" />}
              </Link>
              {hasSubmenu && (
                <div className="submenu">
                  {item.subItems.map(subitem => (
                    <Link
                      key={subitem.path}
                      to={`/${subitem.path}`}
                      activeClassName="active"
                    >
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;

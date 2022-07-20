import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import ChevronDown from "../components/icons/ChevronDown";
import HamburgerMenu from "../components/icons/HamburgerMenu";
import X from "../components/icons/X";
import "../styles/components/nav.scss";

export const navItemsQuery = graphql`
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
  const data = useStaticQuery(navItemsQuery);
  const { navItems } = data.sanitySiteSettings;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <nav>
      <div className="mobile_only hamburger" onClick={toggleNav}>
        <HamburgerMenu />
      </div>

      <div
        className={`mobile_only overlay${isNavOpen ? " overlay_open" : ""}`}
        onClick={toggleNav}
      />

      <div
        className={`items_container${isNavOpen ? " items_container_open" : ""}`}
      >
        <div className="mobile_only close_nav_button" onClick={toggleNav}>
          <X />
        </div>
        {navItems.map(item => {
          const hasSubmenu = item.subItems.length > 0;
          return (
            <div key={item.path} className="top_level_item">
              <Link
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

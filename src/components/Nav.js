/** @jsx jsx */
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { jsx } from "theme-ui"

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
`

const Nav = () => (
  <StaticQuery
    query={query}
    render={data => (
      <nav>
        {data.site.siteMetadata.navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            sx={{
              display: "inline-block",
              textDecoration: "none",
              fontSize: 3,
              fontWeight: "heading",
              color: "#eee",
              mr: [2, 3],
              mb: [2, 0],
              borderBottom: "2px solid transparent",
              transition: ".1s",
              textTransform: "uppercase",
              ":hover": {
                borderBottomColor: "background",
              },
            }}
            activeStyle={{
              borderBottomColor: "#eee",
            }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    )}
  />
)

export default Nav

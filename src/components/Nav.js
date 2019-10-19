import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'

const Nav = () => (
    <StaticQuery
        query={graphql`
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
        `}
        render={data => (
            <ul>
                {data.site.siteMetadata.navLinks.map(link => (
                    <li>
                        <Link to={link.url}>{link.name}</Link>
                    </li>
                ))}
            </ul>  
        )}
    />
)

export default Nav

//need to make these be relative to home URL

/*

    <nav> 
        <ul>
            <li><Link to="/stories">Library of Stories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/founders">Founders</Link></li>
            <li><Link to="/teachers">Teachers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </nav>

*/
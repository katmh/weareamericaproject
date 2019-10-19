/** @jsx jsx */
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { jsx } from 'theme-ui'

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
            <nav
                sx={{
                    mt: 4
                }}
            >
                <ul
                    sx={{
                        p: 0
                    }}
                >
                    {data.site.siteMetadata.navLinks.map(link => (
                        <li
                            sx={{
                                listStyle: 'none',
                                display: 'inline-block'
                            }}
                        >
                            <Link
                                to={link.path}
                                sx={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    fontSize: [2, 3],
                                    fontWeight: 'heading',
                                    color: 'background',
                                    mx: [2, 3],
                                    mb: [2, 0],
                                    borderBottom: '2px solid transparent',
                                    transition: '.1s',
                                    ':hover': {
                                        borderBottomColor: 'background'
                                    }
                                }}
                                activeStyle={{
                                    borderBottomColor: '#eee'
                                }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>  
            </nav>
        )}
    />
)

export default Nav
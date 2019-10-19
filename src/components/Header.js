/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'

const nav = css`
    li {
        list-style: none;
        display: inline-block;
    }
`

const Header = ({ children }) => (
    <header
        sx={{
            width: '100%',
            fontFamily: 'heading',
            textAlign: 'center',
            color: 'background',
            background: 'url("https://lhsweareamerica.com/img/header-darker-min.jpg") center/cover fixed no-repeat',
            pt: [5],
            pb: [2, 4],
            mb: [4, 5]
        }}
    >
        <a
            sx={{
                textDecoration: 'none',
                color: 'background',
            }}
            href="/"
        >
            <h1
                sx={{
                    fontSize: [5, 6],
                    fontWeight: 400,
                    m: 0,
                    letterSpacing: '2px',
                    display: 'inline-block'
                }}
            >We Are America</h1>
        </a>

        <h2
            sx={{
                fontSize: [4, 5],
                fontWeight: 400,
                m: 0,
                letterSpacing: '-.25px',
                color: '#dedede'
            }}
        >
            Voices of the Nation's Future
        </h2>

        <nav
            sx={{
                mt: 4,
                'li': {
                    listStyle: 'none',
                    display: 'inline-block',
                },
                'a': {
                    display: 'block',
                    textDecoration: 'none',
                    fontSize: [2, 3],
                    fontWeight: 'heading',
                    color: 'background',
                    mx: [2, 3],
                    borderBottom: '2px solid transparent',
                    transition: '.1s'
                },
                'a:hover': {
                    borderBottomColor: 'background'
                }
            }}
        >
            <li><a href="stories">Library of Stories</a></li>
            <li><a href="about">About</a></li>
            <li><a href="founders">Founders</a></li>
            <li><a href="teachers">Teachers</a></li>
            <li><a href="contact">Contact</a></li>
        </nav>

        { children }
    </header>
)

export default Header
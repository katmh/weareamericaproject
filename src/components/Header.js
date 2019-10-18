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
            pt: [4, 5],
            pb: [3, 4]
        }}
    >
        <a
            sx={{
                textDecoration: 'none',
                color: 'background',
            }}
            href="https://lhsweareamerica.com"
        >
            <h1
                sx={{
                    fontSize: [4, 5],
                    m: 0
                }}
            >We Are America</h1>
        </a>

        <h2>Voices of the Nation's Future</h2>

        <nav
            sx={{
                'li': {
                    listStyle: 'none',
                    display: 'inline-block',
                },
                'a': {
                    display: 'block',
                    textDecoration: 'none',
                    fontSize: [2, 3],
                    color: 'background',
                    mx: [2, 3],
                }
            }}
        >
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>
            <li><a href="https://instagram.com/lhsweareamerica">Instagram</a></li>
        </nav>

        { children }
    </header>
)

export default Header
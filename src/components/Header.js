/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'

const header = css`
    text-align: center;
    margin: 2rem 0;
`

const nav = css`
    li {
        list-style: none;
        display: inline-block;
    }

    a {
        display: block;
    }
`

const Header = () => (
    <header css={header} sx={{ fontFamily: 'heading' }}>
        <a href="https://lhsweareamerica.com">
            <h1>We Are America</h1>
        </a>

        <h2>Voices of the Nation's Future</h2>

        <nav css={nav}>
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>
            <li><a href="https://instagram.com/lhsweareamerica">Instagram</a></li>
        </nav>
    </header>
)

export default Header
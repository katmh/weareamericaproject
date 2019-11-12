/** @jsx jsx */
import { jsx } from 'theme-ui'
import Nav from './Nav'

const Header = ({ children }) => (
    <header
        sx={{
            width: '100%',
            fontFamily: 'heading',
            textAlign: 'center',
            color: 'background',
            backgroundImage: 'url("header.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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

        <Nav />

        { children }
    </header>
)

export default Header
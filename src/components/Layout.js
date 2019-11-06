/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import SEO from './SEO'
import theme from './theme'

const Layout = ({children}) => (
    <ThemeProvider theme={theme}>
        <Global
            styles={{
                body: {
                    margin: 0
                },
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0
                }
            }}
        />
        <SEO />
        <Header />
        <Container>
            {children}
        </Container>
        <Footer />
    </ThemeProvider>
)

export default Layout
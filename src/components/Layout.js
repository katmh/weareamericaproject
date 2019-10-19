/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'
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
                    m: 0,
                    p: 0
                }
            }}
        />
        <Header />
        <Container>
            {children}
        </Container>
        <Footer />
    </ThemeProvider>
)

export default Layout
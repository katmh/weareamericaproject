/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Global } from '@emotion/core'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'

const Layout = ({children}) => (
    <>
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
    </>
)

export default Layout
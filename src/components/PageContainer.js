/** @jsx jsx */
import { css, Global } from '@emotion/core'
import { jsx } from 'theme-ui'

const pageContainer = css`
    width: 95%;
    max-width: 1100px;
    margin: 0 auto;
`

const PageContainer = ({children}) => (
    <div css={pageContainer}>
        <Global
            styles={{
                body: {
                    margin: 0
                },
                '*': {
                    boxSizing: 'border-box'
                }
            }}
        />
        {children}
    </div>
)

export default PageContainer
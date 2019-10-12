/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'

const pageContainer = css`
    width: 95%;
    max-width: 1100px;
    margin: 0 auto;
`

const PageContainer = ({children}) => (
    <div css={pageContainer}>
        {children}
    </div>
)

export default PageContainer
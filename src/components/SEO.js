/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Helmet } from 'react-helmet'

const SEO = (props) => (
    <Helmet>
        <meta charset="utf-8" />
        <title>We Are America Project{props.pageContext ? ' | ' + props.pageContext.frontmatter.title : ''}</title>
        <link rel="canonical" href="https://www.weareamericaproject.com" />
    </Helmet>
)

export default SEO
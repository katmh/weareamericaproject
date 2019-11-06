/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const BackToAll = () => (
    <Link
        to="/stories"
        sx={{
            display: 'inline-block',
            fontFamily: 'body',
            fontSize: 1,
            mb: 4,
            color: '#444',
            textDecoration: 'none',
            pb: '1px',
            borderBottom: '1px solid #999',
            transition: '.15s',
            ':hover': {
                borderBottom: '1px solid #666',
            }
        }}
    >
        ← Back to all stories
    </Link>
)

export default BackToAll
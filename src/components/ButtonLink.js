/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const ButtonLink = (props) => (
    <Link
        sx={{
            bg: 'accent',
            color: 'background',
            display: 'inline-block',
            mx: 'auto',
            p: '13px 16px 10px',
            textDecoration: 'none',
            fontFamily: 'heading',
            fontWeight: 'heading',
            fontSize: 3,
            lineHeight: '100%',
            transition: '.2s',
            borderRadius: '10px',
            appearance: 'none',
            cursor: 'pointer',
            ':hover': {
                bg: '#422'
            }
        }}
        to={props.destination}
    >
    {props.children}
    </Link>
)

export default ButtonLink
/** @jsx jsx */
import { jsx } from 'theme-ui'

const ButtonInput = (props) => (
    <input
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
            outline: 'none',
            ':hover': {
                bg: '#422'
            }
        }}
        type={props.type}
        value={props.value}
    />
)

export default ButtonInput
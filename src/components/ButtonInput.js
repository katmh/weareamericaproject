/** @jsx jsx */
import { jsx } from 'theme-ui'

const ButtonInput = (props) => (
    <input
        sx={{
            appearance: 'none',
            border: 'none',
            cursor: 'pointer',
            verticalAlign: 'bottom',
            bg: 'accent',
            color: 'background',
            display: 'inline-block',
            mx: 'auto',
            padding: '8px 12.5px 7px',
            textDecoration: 'none',
            fontFamily: 'heading',
            fontWeight: 'heading',
            fontSize: 2,
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
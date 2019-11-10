/** @jsx jsx */
import { jsx } from 'theme-ui'

const FlexContainer = ({ children }) => (
    <div
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            width: '100%',
            mt: 4,
            'p': {
                maxWidth: '100%',
                display: 'block'
            },
            'img': {
                maxWidth: '12rem',
                mb: 3
            }
        }}
    >
        { children }
    </div>
)

export default FlexContainer
/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'

const personCard = css`
    img {
        max-width: 100%;
    }
`

const PersonCard = (props) => (
    <article css={personCard}>
        <img
            src={props.photoUrl}
            alt={"Photo of " + props.name + ", teacher at " + props.school}
        />
        <div>
            <h3 sx={{ fontFamily: 'heading', color: 'text' }}>{props.name}</h3>
            <p>{props.school}{props.schoolType ? (' (' + props.schoolType + ')') : ''}</p>
            <p>{props.city}{props.state ? (', ' + props.state) : ''}</p>
            <p>{props.grades}</p>
            <p>{props.bio}</p>
        </div>
    </article>
)

export default PersonCard
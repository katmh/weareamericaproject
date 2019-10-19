/** @jsx jsx */
import { jsx } from 'theme-ui'

const PersonCard = (props) => (
    <article
        sx={{
            mb: 4,
            overflow: 'auto',
            'p': {
                fontFamily: 'body',
                fontSize: 0,
                lineHeight: '140%',
                mt: 1,
                mb: 2
            }
        }}
    >
        <img
            src={props.photoUrl}
            alt={"Photo of " + props.name}
            sx={{
                maxWidth: ['35%', '100%'],
                float: ['left', 'none'],
                mr: [3, 0],
                mb: [2, 0]
            }}
        />
        <div>
            <h4
                sx={{
                    fontFamily: 'heading',
                    fontSize: 3,
                    fontWeight: 44,
                    color: 'text',
                    mt: [0, 3],
                    mb: 0
                }}
            >
                {props.name}
            </h4>
            <div className="caption">
                <p>
                    {props.grades ? ('Teaches ' + props.grades + ' grade(s) at ') : ''}
                    {props.school ? props.school : ''}
                    {props.city ? (' in ' + props.city) : ''}
                    {props.state ? (', ' + props.state): ''}
                </p>
                <p>{props.bio}</p>
            </div>
        </div>
    </article>
)

export default PersonCard
/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from 'theme-ui'

const storyCard = css`
	margin-bottom: 30px;
	img {
		margin-bottom: 0;
		display: block;
		max-width: 100%;
	}

	.caption {
		overflow: hidden;
		padding: .75rem 1rem;
	}

	h3, h4 {
		margin: 0;
	}

	h3 {
		font-size: 2rem;
	}

	h4 {
		font-size: 1.3rem;
	}
`

const StoryCard = (props) => (
    <article css={storyCard}>
        <img
			src={props.photoUrl}
			alt={"Photo of " + props.author + ", author of " + props.title}
		/>
		<div sx={{ bg: 'background' }} className="caption">
			<h3 sx={{ fontFamily: 'heading', color: 'text' }}>{props.title}</h3>
			<h4 sx={{ fontFamily: 'heading', color: 'muted' }}>{props.author}</h4>
		</div>
		{props.audio ? (
			<div
				sx={{
					background: '#633',
					color: 'background',
					py: 2,
					px: 3
				}}
			>	
			</div>
		) : ''}
    </article>
)

export default StoryCard
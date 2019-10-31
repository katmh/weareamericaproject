/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

const StoryCard = (props) => (
		<article
			sx={{
				mb: '30px',
				':hover img': {
					transform: 'scale(1.15)'
				}
			}}
		>
		<Link
			to={`/story/${slugify(props.author)}`}
		>
			<div
				className="image-wrapper"
				sx={{
					overflow: 'hidden'
				}}
			>
				<img
					src={props.photoUrl}
					alt={"Photo of " + props.name}
					sx={{
						maxWidth: '100%',
						m: '0',
						transition: '.15s',
						position: 'relative',
						zIndex: '-1',
						display: 'block',
					}}
				/>
			</div>
		</Link>
			<div
				sx={{
					bg: 'background',
					overflow: 'hidden',
					p: '.75rem 1rem'
				}}
			>
				<Link
					to={`/story/${slugify(props.author)}`}
				>
					<h3
						sx={{
							fontFamily: 'heading',
							color: 'text',
							m: '0',
							fontSize: '2rem',
							display: 'inline-block',
							textDecoration: 'none'
						}}
					>
						{props.title}
					</h3>
				</Link>
				<h4
					sx={{
						fontFamily: 'heading',
						color: 'muted',
						margin: '0',
						fontSize: '1.3rem'
					}}
				>
					{props.author}
				</h4>
			</div>
    </article>
)

export default StoryCard

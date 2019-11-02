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
				boxShadow: '0 0 6px #bbb',
				':hover img': {
					transform: 'scale(1.15)'
				},
				':hover': {
					boxShadow: '0 0 6px #999',
				}
			}}
		>
		<Link
			to={`/story/${slugify(props.author)}`}
			sx={{
				textDecoration: 'none'
			}}
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
		
			<div
				sx={{
					bg: 'background',
					overflow: 'hidden',
					p: '.75rem 1rem'
				}}
			>
				<h3
					sx={{
						fontFamily: 'heading',
						color: 'text',
						m: '0',
						fontSize: '2rem',
						display: 'inline-block'
					}}
				>
					{props.title}
				</h3>

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
		</Link>
    </article>
)

export default StoryCard

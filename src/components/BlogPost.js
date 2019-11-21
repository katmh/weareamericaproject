/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const BlogPost = ({data}) => (
    <article>
        <Link to={'/news/' + data.frontmatter.path}>
            <h2
                sx={{
                    fontSize: [3, 4],
                    fontFamily: 'heading',
                    fontWeight: '400',
                    color: '#422',
                    mt: 1,
                    display: 'inline-block',
                    textDecoration: 'none',
                    transition: '.1s',
                    ':hover': {
                        color: 'accent'
                    }
                }}
            >
                {data.frontmatter.title}
            </h2>
        </Link>
        <p
            sx={{
                lineHeight: '135%',
                    color: 'text',
                    fontFamily: 'body',
                    fontSize: 0,
                    fontWeight: 300,
                    fontStyle: 'italic',
                    lineHeight: ['135%', '145%'],
                    mt: 1,
                    mb: 3
            }}
        >
            {data.frontmatter.date}
        </p>
        <div
            dangerouslySetInnerHTML={{__html: data.html }}
            sx={{
                'p': {
                    lineHeight: '135%',
                    color: 'text',
                    fontFamily: 'body',
                    fontSize: [0, 1],
                    fontWeight: 300,
                    lineHeight: ['135%', '145%'],
                    my: [2, 3]
                }
            }}	
        />
    </article>
)

export default BlogPost
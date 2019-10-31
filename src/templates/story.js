/** @jsx jsx */
import Layout from '../components/Layout'
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

export default ({pageContext: {data}}) => (
    <Layout>
        <Link
            to="/stories"
            sx={{
                display: 'inline-block',
                fontFamily: 'body',
                fontSize: 1,
                mb: 4,
                color: '#444',
                textDecoration: 'none',
                pb: '1px',
                borderBottom: '1px solid #999',
                transition: '.15s',
                ':hover': {
                    borderBottom: '1px solid #666',
                }
            }}
        >
            ← Back to all stories
        </Link>
        <h1
            sx={{
                fontFamily: 'heading',
                fontSize: 5,
                color: 'accent'
            }}
        >
            {data.Story_Name}
        </h1>
        <h2
            sx={{
                fontFamily: 'heading',
                fontSize: 3,
                textTransform: 'uppercase',
                color: 'text'
            }}
        >
            By {data.Author}
        </h2>
        <h3
            sx={{
                fontFamily: 'heading',
                my: 3,
                fontSize: 2,
                color: 'muted'
            }}
        >
            {data.School}
        </h3>
        <p>
            {data.Tags ?
                <ul>
                    <span
                        sx={{
                            fontFamily: 'body',
                            fontWeight: '700',
                            mr: 1
                        }}
                    >
                        Tags:
                    </span>
                    {data.Tags.map((tag) => (
                        <li
                            sx={{
                                listStyle: 'none',
                                display: 'inline-block',
                                fontFamily: 'body',
                                lineHeight: '100%',
                                mr: 1,
                                bg: 'accent',
                                color: 'background',
                                p: '.4rem .5rem',
                                borderRadius: '.4rem',
                                fontSize: 0,
                                fontWeight: '700'
                            }}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            : ''
            }
        </p>

        <audio
            controls
            src={data.Audio ? data.Audio[0].url : ''}
            sx={{
                display: 'block',
                my: 4
            }}
        >
            Your browser does not support the <code>audio</code> element. :(
        </audio>
        <img
            src={data.Photo ? data.Photo[0].thumbnails.large.url : ''}
            alt={'Photo of' + data.Author}
            sx={{
                maxWidth: '100%'
            }}
        />
    </Layout>
)

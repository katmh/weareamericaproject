/** @jsx jsx */
import Layout from '../components/Layout'
import { jsx } from 'theme-ui'
import BackToAll from '../components/BackToAll'
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

export default ({pageContext: {data}}) => (
    <Layout>
        <BackToAll />
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
                                mr: 1,
                            }}
                        >
                            <Link
                                to={'/tag/' + slugify(tag)}
                                sx={{
                                    fontFamily: 'body',
                                    lineHeight: '100%',
                                    textDecoration: 'none',
                                    bg: 'accent',
                                    color: 'background',
                                    p: '.4rem .6rem',
                                    borderRadius: '.3rem',
                                    fontSize: 0,
                                    fontWeight: '700',
                                    transition: '.1s',
                                    display: 'inline-block',
                                    my: '.15rem',
                                    ':hover': {
                                        color: '#fff',
                                        background: '#844'
                                    }
                                }}
                            >
                                {tag}
                            </Link>
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
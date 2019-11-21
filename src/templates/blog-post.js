/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import BackToAll from '../components/BackToAll'

export default function BlogPostPage({pageContext: {node}}) {
	return (
		<Layout>
			<BackToAll name="news" path="/news" />
			<BlogPost data={node} />
		</Layout>
	)
}
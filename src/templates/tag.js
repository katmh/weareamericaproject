/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/Layout"
import Gallery from "../components/Gallery"
import StoryCard from "../components/StoryCard"
import BackToAll from "../components/BackToAll"

export default ({ pageContext: { edges, fieldValue } }) => (
  <Layout>
    <BackToAll name="stories" path="/stories" />
    <h1
      sx={{
        fontFamily: "heading",
        fontSize: 4,
        mb: 3,
      }}
    >
      <span
        sx={{
          color: "accent",
        }}
      >
        {fieldValue}{" "}
      </span>
      stories ({edges.length})
    </h1>
    <Gallery n={3}>
      {edges.map(edge => (
        <StoryCard
          photoUrl={edge.node.data.Photo[0].thumbnails.large.url}
          title={edge.node.data.Story_Name}
          author={edge.node.data.Author}
        />
      ))}
    </Gallery>
  </Layout>
)
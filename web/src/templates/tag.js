/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import StoryCard from "../components/StoryCard";
import BackToAll from "../components/BackToAll";

const TagPage = ({ pageContext: { nodes, tag } }) => (
  <Layout>
    <BackToAll name="stories" path="/stories" />
    <h1
      sx={{
        fontFamily: "heading",
        fontSize: 4,
        mb: 3
      }}
    >
      <span
        sx={{
          color: "accent"
        }}
      >
        {tag}{" "}
      </span>
      stories ({nodes.length})
    </h1>
    <Gallery n={3}>
      {nodes.map(node => (
        <StoryCard
          key={node.author}
          photoUrl={node.photo.asset.url}
          title={node.storyTitle}
          author={node.author}
        />
      ))}
    </Gallery>
  </Layout>
);

export default TagPage;

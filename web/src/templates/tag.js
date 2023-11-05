/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import StoryCard from "../components/StoryCard";
import BackToAll from "../components/BackToAll";

const TagPage = ({ pageContext: { nodes, tag, tagType } }) => (
  <Layout>
    <BackToAll name="stories" path="/stories" />
    <h1 className="heading large_heading">
      Stories {tagType === "tag" ? `tagged with “${tag}”` : `from ${tag}`}
    </h1>
    <Gallery n={3}>
      {nodes.map(node => (
        <StoryCard
          key={node.authorFirstName}
          photoUrl={node.photo.asset.url}
          title={node.storyTitle}
          author={node.authorFirstName}
        />
      ))}
    </Gallery>
  </Layout>
);

export default TagPage;

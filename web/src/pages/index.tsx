import React from "react";
import ButtonLink from "../components/ButtonLink";
import FeaturedStories from "../components/FeaturedStories";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <p className="subheading">
        The <i>We Are America Project</i> is working with teachers and young
        people across the country to define what it means to be American — and
        to spark a new national conversation about American identity today led
        by the next generation.
      </p>
      <FeaturedStories nCols={3} nStories={6} />
      <div style={{ textAlign: "center" }}>
        <ButtonLink destination="/stories">See All Stories</ButtonLink>
      </div>
    </Layout>
  );
};

export default IndexPage;

import React from "react";
import renderer from "react-test-renderer";

import IndexPage from "../index";

jest.mock("../../components/FeaturedStories", () => () => (
  <section className="featured-stories">Featured stories</section>
));

describe("IndexPage", () => {
  it("matches the page snapshot", () => {
    const tree = renderer.create(<IndexPage />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

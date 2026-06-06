import React from "react";
import renderer from "react-test-renderer";

import AboutPage from "../about";

const data = {
  allSanityPage: {
    nodes: [
      {
        title: "About",
        content: [
          {
            _rawContent: [
              {
                _key: "about-text",
                _type: "block",
                style: "normal",
                markDefs: [],
                children: [
                  {
                    _key: "about-text-child",
                    _type: "span",
                    marks: [],
                    text: "We Are America helps young people tell stories about identity.",
                  },
                ],
              },
            ],
          },
          {
            partners: [
              {
                name: "Partner School",
                url: "https://example.com",
                logo: {
                  asset: {
                    url: "https://example.com/logo.png",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

describe("AboutPage", () => {
  it("matches the page snapshot", () => {
    const tree = renderer.create(<AboutPage data={data} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

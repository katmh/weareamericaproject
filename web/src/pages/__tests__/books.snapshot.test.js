import React from "react";
import renderer from "react-test-renderer";

import BooksPage from "../books";

const data = {
  allSanityPage: {
    nodes: [
      {
        title: "Books",
        content: [
          {
            _rawContent: [
              {
                _key: "books-text",
                _type: "block",
                style: "normal",
                markDefs: [],
                children: [
                  {
                    _key: "books-text-child",
                    _type: "span",
                    marks: [],
                    text: "Collected student stories published by the project.",
                  },
                ],
              },
            ],
          },
          {
            books: [
              {
                title: "We Are America",
                url: "https://example.com/book",
                photo: {
                  asset: {
                    url: "https://example.com/book.jpg",
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

describe("BooksPage", () => {
  it("matches the page snapshot", () => {
    const tree = renderer.create(<BooksPage data={data} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

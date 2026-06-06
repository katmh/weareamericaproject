const React = require("react");

const siteMetadata = {
  title: "We Are America Project",
  url: "https://www.weareamericaproject.com",
  description:
    "The We Are America Project sparks a national conversation about American identity.",
  image: "https://www.weareamericaproject.com/socialheader.jpg",
};

const navItems = [
  {
    isEmphasized: false,
    title: "Stories",
    path: "stories",
    subItems: [],
  },
  {
    isEmphasized: false,
    title: "Books",
    path: "books",
    subItems: [],
  },
  {
    isEmphasized: true,
    title: "Contact",
    path: "contact",
    subItems: [
      {
        title: "Teachers",
        path: "teachers",
      },
    ],
  },
];

const featuredStories = [
  {
    id: "story-1",
    authorFirstName: "Maya",
    storyTitle: "Finding Home",
    photo: {
      asset: {
        url: "https://example.com/maya.jpg",
      },
    },
  },
];

const mockData = {
  site: {
    siteMetadata,
  },
  sanitySiteSettings: {
    navItems,
  },
  allSanityStory: {
    nodes: featuredStories,
  },
};

const graphql = jest.fn();
const useStaticQuery = jest.fn(() => mockData);
const StaticQuery = ({ render }) => render(mockData);

const Link = React.forwardRef(
  (
    { activeClassName, activeStyle, partiallyActive, replace, to, ...props },
    ref
  ) => React.createElement("a", { ref, href: to, ...props })
);

module.exports = {
  graphql,
  Link,
  StaticQuery,
  useStaticQuery,
};

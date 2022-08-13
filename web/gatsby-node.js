const slugify = require("./utils/slugify");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const storiesResult = await graphql(`
    query storiesQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        nodes {
          id
          author
          storyTitle
          photo {
            asset {
              url
            }
          }
          audio {
            asset {
              url
            }
          }
          secondLanguageAudio {
            language
            audio {
              asset {
                url
              }
            }
          }
          school {
            name
            location
          }
          tags
          _rawText
        }
      }
    }
  `);

  const tags = await graphql(`
    query storiesByTagQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        group(field: tags) {
          fieldValue
          nodes {
            author
            storyTitle
            photo {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `);
  const schools = await graphql(`
    query storiesBySchoolQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        group(field: school___name) {
          fieldValue
          nodes {
            author
            storyTitle
            photo {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `);
  const states = await graphql(`
    query storiesByLocationQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        group(field: school___location) {
          fieldValue
          nodes {
            author
            storyTitle
            photo {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `);
  const blogPosts = await graphql(`
    query allBlogPosts {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              title
              date(formatString: "MMMM DD, YYYY")
            }
            html
          }
        }
      }
    }
  `);

  const stories = storiesResult.data.allSanityStory.nodes;
  const storiesPerPage = 18;
  const numPages = Math.ceil(stories.length / storiesPerPage);
  for (let i = 0; i < numPages; i++) {
    createPage({
      path: i === 0 ? "/stories" : `/stories/page/${i + 1}`,
      component: require.resolve("./src/templates/unfiltered-stories-page.js"),
      context: {
        limit: storiesPerPage,
        skip: i * storiesPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  }

  storiesResult.data.allSanityStory.nodes.forEach(node => {
    createPage({
      path: `/story/${slugify(node.author)}/`,
      component: require.resolve("./src/templates/story.js"),
      context: {
        data: node
      }
    });
  });

  const createTagPage = subdir => ({ fieldValue: tag, nodes }) => {
    createPage({
      path: `/${subdir}/${slugify(tag)}`,
      component: require.resolve("./src/templates/tag.js"),
      context: {
        nodes,
        tag
      }
    });
  };

  tags.data.allSanityStory.group.forEach(createTagPage("tag"));
  schools.data.allSanityStory.group.forEach(createTagPage("school"));
  states.data.allSanityStory.group.forEach(createTagPage("state"));

  blogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/news/${slugify(
        node.frontmatter.path ? node.frontmatter.path : ""
      )}/`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { node }
    });
  });

  const internalConversationGuides = await graphql(`
    query InternalConversationGuides {
      allSanityGuide(filter: { path: { ne: null } }) {
        nodes {
          path
          title
          _rawContent
        }
      }
    }
  `);

  internalConversationGuides.data.allSanityGuide.nodes.forEach(guide => {
    createPage({
      path: `/guides/${guide.path}`,
      component: require.resolve("./src/templates/conversation-guide.js"),
      context: {
        title: guide.title,
        content: guide._rawContent
      }
    });
  });
};

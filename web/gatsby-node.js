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
    query storiesByTagsQuery {
      allAirtable(
        filter: {
          table: { eq: "Stories" }
          data: { Status: { eq: "Published" } }
        }
      ) {
        group(field: data___Tags) {
          fieldValue
          edges {
            node {
              id
              data {
                Author
                Story_Name
                Photo {
                  thumbnails {
                    large {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const schools = await graphql(`
    query storiesBySchoolQuery {
      allAirtable(
        filter: {
          table: { eq: "Stories" }
          data: { Status: { eq: "Published" } }
        }
      ) {
        group(field: data___School) {
          fieldValue
          edges {
            node {
              id
              data {
                Author
                Story_Name
                Photo {
                  thumbnails {
                    large {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const states = await graphql(`
    query storiesByStateQuery {
      allAirtable(
        filter: {
          table: { eq: "Stories" }
          data: { Status: { eq: "Published" } }
        }
      ) {
        group(field: data___State) {
          fieldValue
          edges {
            node {
              id
              data {
                Author
                Story_Name
                Photo {
                  thumbnails {
                    large {
                      url
                    }
                  }
                }
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
    if (!node.author) {
      return;
    }
    createPage({
      path: `/story/${slugify(node.author)}/`,
      component: require.resolve("./src/templates/story.js"),
      context: {
        data: node
      }
    });
  });

  tags.data.allAirtable.group.forEach(({ fieldValue, edges }) => {
    createPage({
      path: `/tag/${slugify(fieldValue ? fieldValue : "")}/`,
      component: require.resolve("./src/templates/tag.js"),
      context: { edges, fieldValue }
    });
  });

  schools.data.allAirtable.group.forEach(({ fieldValue, edges }) => {
    createPage({
      path: `/school/${slugify(fieldValue ? fieldValue : "")}/`,
      component: require.resolve("./src/templates/tag.js"),
      context: { edges, fieldValue }
    });
  });

  states.data.allAirtable.group.forEach(({ fieldValue, edges }) => {
    createPage({
      path: `/state/${slugify(fieldValue ? fieldValue : "")}/`,
      component: require.resolve("./src/templates/tag.js"),
      context: { edges, fieldValue }
    });
  });

  blogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/news/${slugify(
        node.frontmatter.path ? node.frontmatter.path : ""
      )}/`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { node }
    });
  });
};

const slugify = require("./utils/slugify");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const stories = await graphql(`
    query allStoriesQuery {
      allAirtable(
        filter: {
          table: { eq: "Stories" }
          data: { Status: { eq: "Published" } }
        }
      ) {
        edges {
          node {
            id
            data {
              Author
              Story_Name
              Photo_URL
              Photo {
                thumbnails {
                  large {
                    url
                  }
                }
              }
              Audio {
                url
              }
              Second_Language
              Second_Language_Audio {
                url
              }
              School
              State
              Tags
              Grade
              Text
            }
          }
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
    query storiesByTagsQuery {
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
    query storiesByTagsQuery {
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

  stories.data.allAirtable.edges.forEach(({ node: { id, data } }) => {
    createPage({
      path: `/story/${slugify(data.Author ?? id)}/`,
      component: require.resolve("./src/templates/story.js"),
      context: { data }
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

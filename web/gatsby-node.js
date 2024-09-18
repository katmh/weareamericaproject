const slugUtils = require("./utils/slugify");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const storiesResult = await graphql(`
    query storiesQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        nodes {
          id
          authorFirstName
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
            city
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
            authorFirstName
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
            authorFirstName
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
            authorFirstName
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
    const slug = slugUtils.getStorySlug(node.storyTitle, node.authorFirstName);
    createPage({
      path: `/story/${slug}/`,
      component: require.resolve("./src/templates/story.js"),
      context: {
        data: node
      }
    });
  });

  const createTagPage = tagType => ({ fieldValue: tag, nodes }) => {
    const slug = slugUtils.getTagSlug(tag);
    createPage({
      path: `/${tagType}/${slug}`,
      component: require.resolve("./src/templates/tag.js"),
      context: {
        nodes,
        tag,
        tagType
      }
    });
  };

  tags.data.allSanityStory.group.forEach(createTagPage("tag"));
  schools.data.allSanityStory.group.forEach(createTagPage("school"));
  states.data.allSanityStory.group.forEach(createTagPage("state"));

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

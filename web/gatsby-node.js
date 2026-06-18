function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function getLegacyStorySlug(storyTitle, authorFirstName) {
  const truncatedStoryTitle = storyTitle
    .split(" ")
    .slice(0, 4)
    .join(" ");
  const firstLetterOfName = authorFirstName[0];
  return slugify(`${truncatedStoryTitle}-${firstLetterOfName}`);
}

function normalizeStorySlug(slug) {
  return slug.replace(/^\/+/, "").replace(/^story\//, "").replace(/\/+$/, "");
}

function getStoryPath({ slug, storyTitle, authorFirstName }) {
  const storySlug = slug
    ? normalizeStorySlug(slug)
    : getLegacyStorySlug(storyTitle, authorFirstName);

  return `/story/${storySlug}/`;
}

function getTagSlug(tag) {
  return slugify(tag);
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const storiesResult = await graphql(`
    query storiesQuery {
      allSanityStory(filter: { isHidden: { ne: true } }) {
        nodes {
          id
          authorFirstName
          storyTitle
          slug
          photo {
            asset {
              id
              url
              metadata {
                dimensions {
                  height
                  width
                }
              }
              gatsbyImageData
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
            slug
            photo {
              asset {
                id
                url
                metadata {
                  dimensions {
                    height
                    width
                  }
                }
                gatsbyImageData
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
            slug
            photo {
              asset {
                id
                url
                metadata {
                  dimensions {
                    height
                    width
                  }
                }
                gatsbyImageData
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
            slug
            photo {
              asset {
                id
                url
                metadata {
                  dimensions {
                    height
                    width
                  }
                }
                gatsbyImageData
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
      component: require.resolve("./src/templates/unfiltered-stories-page.tsx"),
      context: {
        limit: storiesPerPage,
        skip: i * storiesPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  }

  const storyPaths = new Map();

  storiesResult.data.allSanityStory.nodes.forEach(node => {
    const path = getStoryPath(node);
    const existing = storyPaths.get(path);
    if (existing && (existing.slug || node.slug)) {
      throw new Error(
        `Duplicate story path "${path}" for "${existing.storyTitle}" (${existing.id}) and "${node.storyTitle}" (${node.id}). Set unique story.slug values in Sanity.`
      );
    }
    storyPaths.set(path, node);

    createPage({
      path,
      component: require.resolve("./src/templates/story.tsx"),
      context: {
        data: node
      }
    });

    if (node.slug) {
      const legacyPath = getStoryPath({
        storyTitle: node.storyTitle,
        authorFirstName: node.authorFirstName
      });

      if (legacyPath !== path) {
        createRedirect({
          fromPath: legacyPath,
          toPath: path,
          isPermanent: true,
          redirectInBrowser: true
        });
      }
    }
  });

  const createTagPage = tagType => ({ fieldValue: tag, nodes }) => {
    const slug = getTagSlug(tag);
    createPage({
      path: `/${tagType}/${slug}`,
      component: require.resolve("./src/templates/tag.tsx"),
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
      component: require.resolve("./src/templates/conversation-guide.tsx"),
      context: {
        title: guide.title,
        content: guide._rawContent
      }
    });
  });
};

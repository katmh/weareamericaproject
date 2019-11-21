function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const stories = await graphql(`
      query allStoriesQuery {
          allAirtable(filter: {table: {eq: "Stories"}}) {
              edges {
              node {
                  id
                  data {
                      Author
                      Status
                      Story_Name
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
                      School
                      Tags
                      Grade
                      Transcript
                    }
                  }
              }
          }
      }
    `)
    const tags = await graphql(`
      query storiesByTagsQuery {
        allAirtable(filter: {table: {eq: "Stories"}}) {
          group(field: data___Tags) {
            edges {
              node {
                id
                data {
                  Author
                  Status
                  Story_Name
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
                  School
                  Tags
                  Grade
                  Transcript
                }
              }
            }
            fieldValue
          }
        }
      }
    `)
    const schools = await graphql(`
      query storiesByTagsQuery {
        allAirtable(filter: {table: {eq: "Stories"}}) {
          group(field: data___School) {
            edges {
              node {
                id
                data {
                  Author
                  Status
                  Story_Name
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
                  School
                  Tags
                  Grade
                  Transcript
                }
              }
            }
            fieldValue
          }
        }
      }
    `)
    const states = await graphql(`
      query storiesByTagsQuery {
        allAirtable(filter: {table: {eq: "Stories"}}) {
          group(field: data___State) {
            edges {
              node {
                id
                data {
                  Author
                  Status
                  Story_Name
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
                  School
                  Tags
                  Grade
                  Transcript
                }
              }
            }
            fieldValue
          }
        }
      }
    `)
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
    `)

    stories.data.allAirtable.edges.forEach(({node: {id, data}}) => {
        createPage({
            path: `/story/${slugify(data.Author ? data.Author : id)}/`,
            component: require.resolve('./src/templates/story.js'),
            context: {data},
        })
    })

    tags.data.allAirtable.group.forEach(({fieldValue, edges}) => {
        createPage({
            path: `/tag/${slugify(fieldValue ? fieldValue : '')}/`,
            component: require.resolve('./src/templates/tag.js'),
            context: {edges, fieldValue},
        })
    })

    schools.data.allAirtable.group.forEach(({fieldValue, edges}) => {
      createPage({
          path: `/school/${slugify(fieldValue ? fieldValue : '')}/`,
          component: require.resolve('./src/templates/tag.js'),
          context: {edges, fieldValue},
      })
    })

    states.data.allAirtable.group.forEach(({fieldValue, edges}) => {
      createPage({
          path: `/state/${slugify(fieldValue ? fieldValue : '')}/`,
          component: require.resolve('./src/templates/tag.js'),
          context: {edges, fieldValue},
      })
    })
    
    blogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/news/${slugify(node.frontmatter.path ? node.frontmatter.path : '')}/`,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {node},
      })
    })
}
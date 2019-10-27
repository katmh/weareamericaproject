exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
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

    result.data.allAirtable.edges.forEach(({node: {id, data}}) => {
      createPage({
        path: `/story/${id}/`,
        component: require.resolve('./src/templates/story.js'),
        context: {data},
      })
    })
}

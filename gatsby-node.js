const path = require(`path`)

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

exports.onCreateNode = ({ node, actions }) => {
    if (node.table === `Stories`) {
        const { createNodeField } = actions
        //console.log(slugify(node.data.Author))
        createNodeField({
            node,
            name: `slug`,
            value: slugify(node.data.Author) // available at node.fields.slug
        })
    }
  }

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    {
        allAirtable(filter: {table: {eq: "Stories"}}) {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `)

    console.log(result.data.allAirtable.nodes)
    /*
    result.data.allAirtable.nodes.forEach(({ nodes }) => {
        createPage({
            path: nodes.fields.slug,
            component: path.resolve(`./src/templates/stories.js`),
            context: {
                slug: nodes.fields.slug,
            },
        })
    })
*/
    //console.log(JSON.stringify(result, null, 4))
}
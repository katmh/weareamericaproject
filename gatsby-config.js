module.exports = {
  siteMetadata: {
    title: `The We Are America Project`,
    url: `https://weareamericaproject.com`,
    navLinks: [
      {
        name: 'Library of Stories',
        path: '/stories'
      },
      {
        name: 'About',
        path: '/about'
      },
      {
        name: 'Founders',
        path: '/founders'
      },
      {
        name: 'Teachers',
        path: '/teachers'
      },
      {
        name: 'Contact',
        path: '/contact'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_STORIES_BASE_ID,
            tableName: `Stories`
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Teachers`
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Founders`
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Staatliches`,
            variants: [`400`]
          },
          {
            family: `Lato`,
            variants: [`300`, `300i`, `700`, `700i`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
}
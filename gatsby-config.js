module.exports = {
  siteMetadata: {
    title: `We Are America Project`,
    url: `https://weareamericaproject.com`,
    description: `The We Are America Project is working with teachers and young people across the country to define what it means to be American — and to spark a new national conversation about American identity today led by the next generation.`,
    navLinks: [
      {
        name: "Library of Stories",
        path: "/stories",
      },
      {
        name: "About",
        path: "/about",
      },
      {
        name: "Founders",
        path: "/founders",
      },
      {
        name: "Teachers",
        path: "/teachers",
      },
      {
        name: "News",
        path: "/news",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint:
          "https://weareamericaproject.us4.list-manage.com/subscribe/post?u=466aceffe785790da648587fc&amp;id=3a60133af9",
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_STORIES_BASE_ID,
            tableName: `Stories`,
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Teachers`,
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Founders`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Staatliches`,
              variants: [`400`],
            },
            {
              family: `Lato`,
              variants: [`300`, `300i`, `700`, `700i`],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}

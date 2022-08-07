// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});

const clientConfig = require("./client-config");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: `We Are America Project`,
    titleTemplate: `%s | We Are America Project`,
    url: `https://www.weareamericaproject.com`,
    description: `The We Are America Project is working with teachers and young people across the country to define what it means to be American — and to spark a new national conversation about American identity today led by the next generation.`,
    image: `https://www.weareamericaproject.com/socialheader.jpg`,
    navLinks: [
      {
        name: "Stories",
        path: "/stories"
      },
      {
        name: "Books",
        path: "/books"
      },
      {
        name: "About",
        path: "/about"
      },
      {
        name: "Founders",
        path: "/founders"
      },
      {
        name: "Teachers",
        path: "/teachers"
      },
      {
        name: "News",
        path: "/news"
      }
    ]
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint:
          "https://weareamericaproject.us4.list-manage.com/subscribe/post?u=466aceffe785790da648587fc&amp;id=3a60133af9"
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Teachers`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Fira Sans Condensed`,
              variants: [`700`]
            },
            {
              family: `Fira Sans`,
              variants: [`400`, `400i`, `700`]
            },
            {
              family: `PT Sans`,
              variants: [`400`, `400i`, `700`]
            }
          ]
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/`
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    `gatsby-plugin-sass`
  ]
};

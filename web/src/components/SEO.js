/** @jsx jsx */
import { jsx } from "theme-ui";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const SEO = ({ title = "", noIndex = false }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            url
            description
            image
          }
        }
      }
    `}
    render={data => {
      const site = data.site.siteMetadata;
      return (
        <Helmet>
          <meta charset="utf-8" />
          <title>
            We Are America Project
            {title.length ? " | " + title : ""}
          </title>

          {/* Conditionally apply noindex for paginated pages */}
          {noIndex && <meta name="robots" content="noindex, follow" />}

          <link rel="canonical" href={site.url} />
          <link rel="icon" type="image/ico" href="/favicon.ico" />
          <meta name="description" content={site.description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />

          <meta property="og:title" content={site.title} />
          <meta property="og:description" content={site.description} />
          <meta property="og:image" content={site.image} />
          <meta property="og:url" content={site.url} />
          <meta property="og:site_name" content={site.title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={site.title} />
          <meta name="twitter:image" content={site.image} />
          <meta
            name="twitter:image:alt"
            content="Collage of students' eyes, with semi-transparent red and white stripes of the American flag overlaid"
          />
        </Helmet>
      );
    }}
  />
);

export default SEO;

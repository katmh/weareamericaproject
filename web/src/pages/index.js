/** @jsx jsx */
import React from "react"
import FeaturedStories from "../components/FeaturedStories"
import ButtonLink from "../components/ButtonLink"
import Layout from "../components/Layout"
import Container from "../components/Container"
import Gallery from "../components/Gallery"
import { jsx } from "theme-ui"
import { Timeline } from "react-twitter-widgets"
import { Link } from "gatsby"
import Subscribe from "../components/Subscribe"

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Container width="medium">
          <p
            sx={{
              fontFamily: "body",
              fontSize: 2,
              lineHeight: 1.5,
              color: "text",
              mb: 5,
            }}
          >
            The <i>We Are America Project</i> is working with teachers and young
            people across the country to define what it means to be American —
            and to spark a new national conversation about American identity
            today led by the next generation.
          </p>
        </Container>

        <FeaturedStories nCols={3} nStories={6} />

        <br />
        <center>
          <ButtonLink destination="/stories">See All Stories</ButtonLink>
        </center>
        <br />
        <br />

        <Container width="medium">
          <Gallery n={2}>
            <div>
              <p
                sx={{
                  fontFamily: "body",
                  fontSize: 2,
                  lineHeight: 1.5,
                  color: "text",
                  display: "inline-block",
                }}
              >
                Subscribe to our newsletter for updates:
              </p>

              <Subscribe />

              <p
                sx={{
                  fontFamily: "body",
                  fontSize: 2,
                  lineHeight: 1.5,

                  display: "block",
                  my: 3,
                }}
              >
                <Link sx={{ color: "text" }} to="/about#contact">
                  Contact us
                </Link>
              </p>
            </div>

            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: "weareamericapr1",
              }}
              options={{
                height: "400",
                width: "400",
              }}
            />
          </Gallery>
        </Container>
      </Layout>
    )
  }
}

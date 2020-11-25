/** @jsx jsx */
import React from "react"
import FeaturedStories from "../components/FeaturedStories"
import ButtonLink from "../components/ButtonLink"
import ButtonInput from "../components/ButtonInput"
import Layout from "../components/Layout"
import Container from "../components/Container"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { jsx } from "theme-ui"
export default class IndexPage extends React.Component {
  state = {
    email: null,
  }

  _handleChange = e => {
    console.log({
      [`${e.target.name}`]: e.target.value,
    })
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault()

    addToMailchimp(this.state.email, this.state)
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`)

        if (result !== "success") {
          throw msg
        }
        alert(msg)
      })
      .catch(err => {
        console.log("err", err)
        alert(err)
      })
  }

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

        <Container width="medium">
          <p
            sx={{
              fontFamily: "body",
              fontSize: 2,
              lineHeight: 1.5,
              color: "text",
              display: "inline-block",
              mt: 5,
            }}
          >
            Subscribe to our newsletter for updates:
          </p>

          <form
            sx={{
              display: "inline-block",
              ml: 2,
            }}
            onSubmit={this._handleSubmit}
          >
            <input
              sx={{
                variant: "body",
                padding: 1,
                ml: 1,
                mr: 2,
              }}
              type="email"
              onChange={this._handleChange}
              placeholder="name@email.com"
              name="email"
            />
            <ButtonInput type="submit" value="Submit" />
          </form>
        </Container>
      </Layout>
    )
  }
}

/** @jsx jsx */
import React from 'react';
import FeaturedStories from '../components/FeaturedStories'
import ButtonLink from '../components/ButtonLink'
import Layout from "../components/Layout"
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { jsx } from 'theme-ui'

const h3 = {
  lineHeight: '135%',
  color: 'text',
  fontFamily: 'body',
  fontSize: [2, 3],
  fontWeight: 300,
  lineHeight: '130%',
  mb: [4, 5],
  mx: [3, 6]
};

export default class IndexPage extends React.Component {
    state = {
        email: null,
    }

    _handleChange = (e) => {
        console.log({
            [`${e.target.name}`]: e.target.value,
        });
        this.setState({
            [`${e.target.name}`]: e.target.value,
        });
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        console.log('submit', this.state);

        addToMailchimp(this.state.email, this.state)
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`);

                if (result !== 'success') {
                    throw msg;
                }
                alert(msg);
            })
            .catch((err) => {
                console.log('err', err);
                alert(err);
            });
    }

    render() {
        return (
            <Layout>
                <h3
                  sx={{ variant: "h3" }}
                >
                  The <i>We Are America Project</i> is working with teachers and young people across the country to define what it means to be American — and to spark a new national conversation about American identity today led by the next generation.
                </h3>

                <h3
                  sx={{ variant: "h3" }}
                >
                  Subscribe to our newsletter for updates:
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

                      }}
                      type="email"
                      onChange={this._handleChange}
                      placeholder="email"
                      name="email"
                    />
                    <input
                      sx={{
                        variant: "body",
                        py: 3,
                        ml: 1,
                      }}
                      type="submit"
                    />
                  </form>
                </h3>

                

                <FeaturedStories nCols={3} nStories={6} />

                <br/>
                <center>
                <ButtonLink destination="/stories">
                  See All Stories
                </ButtonLink>
                </center>
            </Layout>
        );
    }
}
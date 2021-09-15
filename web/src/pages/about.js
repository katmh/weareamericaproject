/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import FlexContainer from "../components/FlexContainer"
import ContactForm from "../components/ContactForm"
import BlockContent from "@sanity/block-content-to-react"

const About = ({ data }) => {
  const content = data.allSanityPage.edges[0].node.content
  const textBlocks = content[0]._rawContent
  const partners = content[1]._rawPartners
  const contactBlock = content[2]._rawDescription
  return (
    <Layout width="medium">
      <BlockContent blocks={textBlocks} />
      <FlexContainer>
        {partners.map((partner) => (
          <a href={partner.url} key={partner._key}>
            <img src="" alt={partner.name} />
          </a>
        ))}
      </FlexContainer>
      <BlockContent blocks={contactBlock} />
      <ContactForm />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutPageQuery {
    allSanityPage(filter: { title: { eq: "About" } }) {
      edges {
        node {
          content {
            ... on SanityTextSection {
              _rawContent
            }
            ... on SanityPartnersSection {
              _rawPartners
            }
            ... on SanityContactSection {
              _rawDescription
            }
          }
        }
      }
    }
  }
`

export default About

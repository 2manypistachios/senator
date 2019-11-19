import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const post = data.markdownRemark

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <h2
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
            {post.frontmatter.title}
        </h2>
        <small>{post.frontmatter.date}</small>
        <p
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: {regex: "/DATABASE.md/"}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`

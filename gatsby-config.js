module.exports = {
  siteMetadata: {
    title: `Max's Database`,
    author: `Maxim Podolski`,
    description: `A database with added site search.`,
    siteUrl: `https://gatsby-starter-blog-with-lunr-demo.netlify.com/`,
    social: {
      twitter: `https://twitter.com/2manypistachios`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [{ name: "en" }],
        fields: [
          { name: "title", store: true, attributes: { boost: 20 } },
          { name: "category", store: true, attributes: { boost: 15 } },
          { name: "subcategory", store: true, attributes: { boost: 15 } },
          { name: "source", store: true, attributes: { boost: 10 } },
          { name: "author", store: true, attributes: { boost: 5 } },
          { name: "description", store: true, attributes: { boost: 5 } },
          { name: "content" },
          { name: "url", store: true },
          { name: "date", store: true },
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            category: node => node.frontmatter.category,
            subcategory: node => node.frontmatter.subcategory,
            source: node => node.frontmatter.source,
            author: node => node.frontmatter.author,
            description: node => node.frontmatter.description,
            content: node => node.rawMarkdownBody,
            url: node => node.fields.slug,
            date: node => node.frontmatter.date,
          },
        },
        filename: "search_index.json",
      },
    },
    `gatsby-plugin-netlify-cms`,
  ],
}

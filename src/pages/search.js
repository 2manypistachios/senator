import React, { useState, useEffect } from "react"
import { graphq } from "gatsby"
import { Router } from "@reach/router"
import debounce from "lodash.debounce"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Login from "./login"
import SearchForm from "../components/searchForm"
import SearchResults from "../components/searchResults"
import ErrorBoundary from "../components/errorBoundary"

const Search = ({ data, location }) => {
  const [results, setResults] = useState([])
  const searchQuery = new URLSearchParams(location.search).get("keywords") || ""

  useEffect(() => {
    if (searchQuery && window.__LUNR__) {
      const debouncedSearch = debounce(async () => {
        const lunr = await window.__LUNR__.__loaded
        const refs = lunr.en.index.search(searchQuery)
        const posts = refs.map(({ ref }) => lunr.en.store[ref])
        setResults(posts)
      }, 500)

      debouncedSearch()
    }

    if (!searchQuery) setResults([])
  }, [location.search])

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <Router>
        <PrivateRoute path="/search" component={PrivateSearch} query={searchQuery} results={results}/>
        <Login path="/login" />
      </Router>
    </Layout>
  )
}

class PrivateSearch extends React.Component {
  render() {
    let searchQuery = this.props.query;
    let results = this.props.results;
    return (
      <ErrorBoundary>
      <div>
        <SearchForm query={searchQuery} />
        <SearchResults query={searchQuery} results={results} />
      </div>
      </ErrorBoundary>
    )
  }
}

export default Search

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadListings, paramsToEndpoint } from '../actions'
import Nav from '../components/Nav'
import PageContainer from '../components/PageContainer'
import Timeline from '../components/Timeline'

// TODO: Figure out the flow of loading pages as users scrolls down page.
class Listings extends Component {
  componentWillMount() {
    // Combines subreddit & sorting (params) w/ count & after (location.query)
    this.props.loadListings(Object.assign({},
      this.props.params,
      this.props.location.query
    ))
  }
  componentDidMount() {
    const root = document.querySelector('#root')
    root.addEventListener('scroll', () => {
      const { offsetHeight, scrollHeight, scrollTop } = root
      console.log(
        'offsetHeight', offsetHeight,
        'scrollTop', scrollTop,
        'scrollHeight', scrollHeight,
      )
      console.log('should i get more items?', scrollTop + offsetHeight >= scrollHeight - offsetHeight && scrollHeight > offsetHeight)
    })
  }
  render() {
    const { pageData } = this.props
    return (
      <div>
        <Nav />
        <PageContainer>
          { pageData ? <Timeline pageData={pageData} /> : null }
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { listingsByEndpoint },
    entities: { listings },
  } = state

  // Populates pages array.
  const pages = []
  let endpoint = paramsToEndpoint(Object.assign({},
    ownProps.params,
    ownProps.location.query
  ))
  while (endpoint && listingsByEndpoint[endpoint]) {
    const page = listingsByEndpoint[endpoint]
    pages.push(page)
    if (page.after) {
      const nextPageParams = Object.assign({}, ownProps.params, { after: page.after })
      endpoint = paramsToEndpoint(nextPageParams)
    } else {
      endpoint = null
    }
  }

  // Aggregates the listings in the pageData array by page.
  // TODO: test if perfomance is better if pageData is divided by page.
  const pageData = []
  for (let page in pages) {
    if (Object.keys(listings).length > 0 && pages[page] && pages[page].ids) {
      const pageListings = pages[page].ids.map(id => listings[id])
      for (let listing in pageListings) {
        pageData.push(pageListings[listing])
      }
    }
  }

  return { pages, pageData }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

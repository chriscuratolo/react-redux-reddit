import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadListings, paramsToEndpoint } from '../actions'
import Nav from '../components/Nav'
import Page from '../components/Page'
import PageContainer from '../components/PageContainer'
import Timeline from '../components/Timeline'
import './Listings.css'

// TODO: this component needs to change maxWidth depending on window size
class Listings extends Component {
  componentWillMount() {
    // Combines subreddit & sorting (params) w/ count & after (location.query)
    this.props.loadListings(Object.assign({},
      this.props.params,
      this.props.location.query
    ))
  }
  componentDidMount() {
    document.addEventListener('scroll', event => {
      /*
       * offsetHeight => height of the window
       *  scrollHeight => height of content
       *  scrollTop    => top of window
       *
       *  If bottom of view is within a page-length away from bottom
       *  and height of content is larger than the height of the view,
       *  then load another page.
       */

      const { offsetHeight, scrollHeight, scrollTop } = event.srcElement.body
      const withinPageLengthFromBottom = scrollTop + offsetHeight >= scrollHeight - offsetHeight
      const heightOfContentLargerThanView = scrollHeight > offsetHeight

      if (withinPageLengthFromBottom && heightOfContentLargerThanView) {
        const { pages } = this.props
        const lastPage = pages[pages.length - 1]

        this.props.loadListings(Object.assign({},
          this.props.params,
          this.props.loadListings.query,
          { after: lastPage.after }
        ))
      }
    })
  }
  render() {
    const { pageData, isFetching } = this.props
    return (
      <Page>
        <Nav />
        <PageContainer>
          <Timeline isFetching={isFetching} pageData={pageData} />
        </PageContainer>
      </Page>
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
      const nextPageParams = Object.assign({},
        ownProps.params,
        { after: page.after }
      )
      endpoint = paramsToEndpoint(nextPageParams)
    } else {
      endpoint = null
    }
  }

  // Aggregates the listings in the pageData array by page.
  let pageData = null  // Initially falsy
  let isFetching = false
  for (let page in pages) {
    if (Object.keys(listings).length > 0 && pages[page]) {
      // Page is done loading
      if (!pages[page].isFetching) {
        const pageListings = pages[page].ids.map(id => listings[id])
        if (!pageData) { pageData = [] }
        for (let listing in pageListings) { pageData.push(pageListings[listing]) }
      } else {
        // Page is loading
        isFetching = true
      }
    }
  }

  return { pages, pageData, isFetching }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

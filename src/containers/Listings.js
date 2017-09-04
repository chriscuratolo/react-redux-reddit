import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadListings, paramsToEndpoint } from '../actions'
import Nav from '../components/Nav'
import PageContainer from '../components/PageContainer'
import Timeline from '../components/Timeline'

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
      /*
       * offsetHeight => height of the window
       *  scrollHeight => height of content
       *  scrollTop    => top of window
       *
       *  If bottom of view is within a page-length away from bottom
       *  and height of content is larger than the height of the view,
       *  then load another page.
       */

      const { offsetHeight, scrollHeight, scrollTop } = root
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
      <div>
        <Nav />
        <PageContainer>
          {
            pageData
              ? <Timeline
                  isFetching={isFetching}
                  pageData={pageData}
                />
              : null
          }
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
  // TODO: test if perfomance is better if pageData is divided by page.
  // TODO: figure out best way to express that next page is loading.
  const pageData = []
  let isFetching = false
  for (let page in pages) {
    if (Object.keys(listings).length > 0 && pages[page]) {
      const pageListings = pages[page].ids.map(id => listings[id])
      for (let listing in pageListings) {
        pageData.push(pageListings[listing])
      }
    }
  }

  return { pages, pageData, isFetching }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

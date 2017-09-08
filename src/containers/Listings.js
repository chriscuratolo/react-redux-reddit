import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Card, { CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'

import { loadListings, paramsToEndpoint } from '../actions'
import Nav from '../components/Nav'
import Page from '../components/Page'
import PageContainer from '../components/PageContainer'
import Feed from '../components/Feed'
import './Listings.css'

const styles = {
  card: {
    borderRadius: '0',
    boxShadow: '0',
  },
  cardTitle: {
    textAlign: 'center'
  },
  column: {
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  },
  tab: {
    fontSize: '13px',
  },
  tabItemContainer: {
    borderRadius: '0',
    boxShadow: '0',
  },
}

// TODO: this component needs to change maxWidth depending on window size
class Listings extends Component {
  componentWillMount() {
    // Combines subreddit & sorting (params) w/ count & after (location.query)
    this.props.loadListings(Object.assign({},
      this.props.params,
      this.props.location.query
    ))

    // Sets sorting tab based on params
    if (this.props.params.sorting) {
      this.setState({ selectedTab: this.props.params.sorting })
    } else {
      this.setState({ selectedTab: 'hot' })
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', event => {
      /*
       *  If bottom of view is within a page-length away from bottom
       *  and height of content is larger than the height of the view,
       *  then load another page.
       *
       *  offsetHeight => height of the window
       *  scrollHeight => height of content
       *  scrollTop    => top of window
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
  componentWillReceiveProps(nextProps) {
    const { sorting } = this.props.params
    if (sorting !== nextProps.params.sorting) {
      this.setState({ selectedTab: nextProps.params.sorting })
      this.props.loadListings(Object.assign({},
        nextProps.params,
        nextProps.location.query
      ))
    }
  }
  state = {
    selectedTab: null,
  }
  handleTabChange = sorting => {
    const newParams = Object.assign({}, this.props.params, { sorting })
    const endpoint = paramsToEndpoint(newParams)
    this.props.router.push(endpoint)
  }
  render() {
    const { subreddit, sorting } = this.props.params
    return (
      <Page>
        <Nav />
        <PageContainer>
          <div style={styles.column}>
            <Card style={styles.card}>
              <CardTitle
                title={subreddit ? `r/${subreddit}` : 'Home'}
                style={styles.cardTitle}
              />
              <Divider />
            </Card>
            <Tabs
              onChange={this.handleTabChange}
              tabItemContainerStyle={styles.tabItemContainer}
              value={this.state.selectedTab}
            >
              <Tab label='hot' style={styles.tab} value='hot'>
                {!sorting || sorting === 'hot' ?
                  <Feed
                    isFetching={this.props.isFetching}
                    pageData={this.props.pageData}
                  /> : null}
              </Tab>
              <Tab label='new' style={styles.tab} value='new'>
                {sorting === 'new' ?
                  <Feed
                    isFetching={this.props.isFetching}
                    pageData={this.props.pageData}
                  /> : null}
              </Tab>
              <Tab label='controversial' style={styles.tab} value='controversial'>
                {sorting === 'controversial' ?
                  <Feed
                    isFetching={this.props.isFetching}
                    pageData={this.props.pageData}
                  /> : null}
              </Tab>
              <Tab label='top' style={styles.tab} value='top'>
                {sorting === 'top' ?
                  <Feed
                    isFetching={this.props.isFetching}
                    pageData={this.props.pageData}
                  /> : null}
              </Tab>
            </Tabs>
          </div>
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
  let pageData = []
  let isFetching = false
  for (let page in pages) {
    if (Object.keys(listings).length > 0 && pages[page]) {
      // Page is done loading
      if (!pages[page].isFetching) {
        const pageListings = pages[page].ids.map(id => listings[id])
        for (let listing in pageListings) { pageData.push(pageListings[listing]) }
      } else {
        // Page is loading
        isFetching = true
      }
    }
  }

  return { pages, pageData, isFetching }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'

import { loadListings, paramsToEndpoint } from '../actions'
import PageContainer from '../components/PageContainer'
import Timeline from '../components/Timeline'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
  }
}

const title = (subreddit, sorting) => {
  let title = ''
  if (subreddit) {
    title += `r/${subreddit}`
    if (sorting && sorting !== 'hot') {
      title += `/${sorting}`
    }
  } else {
    return `Reddit`
  }
  return title
}

class Listings extends Component {
  componentWillMount() {
    this.props.loadListings(this.props.params)
  }
  render() {
    const { params: { subreddit, sorting }, pageData } = this.props
    return (
      <div>
        <AppBar
          title={title(subreddit, sorting)}
          style={styles.appBar}
          showMenuIconButton={false}
        />
        <PageContainer>
          { pageData ? <Timeline pageData={pageData} /> : null }
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pagination: { listingsByEndpoint }, entities: { listings } } = state
  const page = listingsByEndpoint[paramsToEndpoint(ownProps.params)]
  const pageData = page && page.ids.map(id => listings[id])

  return { page, pageData }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

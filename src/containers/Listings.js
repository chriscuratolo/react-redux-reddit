import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'

import { loadListings } from '../actions'
import Container from '../components/Container'
import Page from '../components/Page'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
  }
}

const title = (subreddit, sorting) => {
  if (subreddit) {
    return `r/${subreddit}`
  } else if (sorting) {
    return sorting
  } else {
    return 'hot'
  }
}

class Listings extends Component {
  componentWillMount() {
    const { subreddit, sorting } = this.props.params
    this.props.loadListings(subreddit, sorting)
  }
  render() {
    const { subreddit, sorting } = this.props.params
    return (
      <div>
        <AppBar
          title={title(subreddit, sorting)}
          style={styles.appBar}
          showMenuIconButton={false}
        />
        <Page>
          <Container>
          </Container>
        </Page>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pagination:{ listingsByEndpoint }, entities: { listings } } = state
  const page = listingsByEndpoint[ownProps.location.pathname]
  const pageData = page && page.ids.map(id => listings[id])

  return { page, pageData }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

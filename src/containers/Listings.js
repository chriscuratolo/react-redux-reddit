import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import { CardText } from 'material-ui/Card'

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
  let title = ''
  if (subreddit) {
    title += `r/${subreddit}`
    if (sorting && sorting !== 'hot') {
      title += `/$${sorting}`
    }
  } else {
    return `Home`
  }
  return title
}

class Listings extends Component {
  componentWillMount() {
    const { subreddit, sorting } = this.props.params
    this.props.loadListings(subreddit, sorting)
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
        <Page>
          <Container>
            {
              pageData
                ? <CardText>
                    <pre>
                      {JSON.stringify(pageData, null, 2)}
                    </pre>
                  </CardText>
                : null
            }
          </Container>
        </Page>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pagination:{ listingsByEndpoint }, entities: { listings } } = state
  const { subreddit, sorting } = ownProps.params

  let endpoint = ``
  if (subreddit) {
    endpoint += `/r/${subreddit}`
  }
  if (sorting) {
    endpoint += `/${sorting}`
  } else {
    endpoint += `/hot`
  }

  const page = listingsByEndpoint[endpoint]
  const pageData = page && page.ids.map(id => listings[id])

  return { page, pageData }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadListings }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Listings)

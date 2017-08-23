import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'

import Container from '../components/Container'
import Page from '../components/Page'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar title='Home' style={styles.appBar} />
        <Page>
          <Container>
          </Container>
        </Page>
      </div>
    )
  }
}

export default Home

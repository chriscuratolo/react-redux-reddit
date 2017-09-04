import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Card, { CardActions, CardText, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

import { initializeToken } from '../actions'
import Nav from '../components/Nav'
import Page from '../components/Page'
import PageContainer from '../components/PageContainer'

const authorizationURL = width =>
  `https://www.reddit.com/api/v1/authorize`
    + `${width && width > 590 ? '' : '.compact'}`
    + `?client_id=${process.env.REACT_APP_CLIENT_ID}`
    + `&response_type=code`
    + `&state=${localStorage.getItem('authState')}`
    + `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    + `&duration=permanent`
    + `&scope=mysubreddits read`

const randomString = length => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

const styles = {
  card: {
    margin: '6% auto',
    maxWidth: '590px',
  },
  cardText: {
    fontSize: '14px',
    lineHeight: '150%',
  },
  cardActions: {
    textAlign: 'right',
  },
}

class Authorize extends Component {
  state = { width: null, height: null }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.router.push('/')
    } else if (!localStorage.getItem('authState')) {
      localStorage.setItem('authState', randomString(10))
    }
  }
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    const { state, code, error } = this.props.location.query
    if (state && code) {
      if (state === localStorage.getItem('authState')) {
        this.props.initializeToken(code)
      } else {
        console.log('Authorization Error: Invalid state.')
      }
    }
    if (state && error) {
      console.log(error)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      localStorage.removeItem('authState')
      this.props.router.push('/')
    }
  }
  render() {
    return (
      <Page>
        <Nav />
        <PageContainer>
          <Card style={styles.card}>
            <CardTitle title='Authorization' />
            <Divider />
            <CardText style={styles.cardText}>
              In order to make requests to reddit's API via OAuth, you must grant the reddit client an <a href='https://github.com/reddit/reddit/wiki/OAuth2#authorization'>authorization token</a>.
            </CardText>
            <CardActions style={styles.cardActions}>
              <FlatButton
                disableTouchRipple={true}
                hoverColor='#FFFFFF'
                label='Grant token'
                href={authorizationURL(this.state.width)}
              />
            </CardActions>
          </Card>
        </PageContainer>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  id: state.auth.id,
})

const mapDispatchToProps = dispatch => bindActionCreators({ initializeToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Authorize)

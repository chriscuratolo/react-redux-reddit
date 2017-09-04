import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppBar from 'material-ui/AppBar'
import Card, { CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { initializeToken } from '../actions'
import Page from '../components/Page'

const authorizationURL = width =>
  `https://www.reddit.com/api/v1/authorize`
    + `${width && width > 600 ? '' : '.compact'}`
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
  appBar: {
    position: 'fixed',
    top: 0,
  },
  card: {
    margin: '23px auto',
    maxWidth: '600px',
  },
  cardActions: {
    textAlign: 'right',
  },
  text: {
    color: 'rgba(0, 0, 0, 0.54)',
  }
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
        <AppBar
          title='reddit'
          showMenuIconButton={false}
          style={styles.appBar}
        />
        <Card style={styles.card}>
          <CardMedia>
            <img src='assets/snoo-narwhal.gif' alt='snoo-narwhal' />
          </CardMedia>
          <CardText>
            <h1>Authorization</h1>
            <p style={styles.text}>
              In order to make requests to reddit's API via OAuth, you must grant the reddit client an <a href='https://github.com/reddit/reddit/wiki/OAuth2#authorization'>authorization token</a>.
            </p>
          </CardText>
          <CardActions style={styles.cardActions}>
            <a href={authorizationURL(this.state.width)}>
              <RaisedButton label='Authorize' primary={true} />
            </a>
          </CardActions>
        </Card>
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

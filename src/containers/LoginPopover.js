import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import LoginForm from '../components/LoginForm'

class LoginPopover extends Component {
  state = { open: false }

  handleSubmit = values => {
    console.log(values)
  }

  handleTouchTap = event => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <FlatButton
          label='Login'
          onTouchTap={this.handleTouchTap}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
        >
          <LoginForm onSubmit={this.handleSubmit} />
        </Popover>
      </div>
    )
  }
}

export default LoginPopover

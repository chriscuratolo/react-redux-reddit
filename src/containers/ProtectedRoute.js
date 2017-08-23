import { Component } from 'react'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.router.push('authorize')
    }
  }
  render() {
    if (this.props.isAuthenticated) {
      return this.props.children
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect(mapStateToProps)(ProtectedRoute)

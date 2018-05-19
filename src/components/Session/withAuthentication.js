import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { firebase } from '../../firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)
      this.state = { ready: false, user: null }
    }
    componentDidMount() {
      const { onSetAuthUser } = this.props

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          onSetAuthUser(authUser)
        } else {
          onSetAuthUser(null)
        }
        this.setState(() => ({ ready: true, user: authUser }))
      })
    }

    render() {
      return <Component ready={this.state.ready} user={this.state.user} />
    }
  }

  WithAuthentication.propTypes = {
    onSetAuthUser: PropTypes.func,
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: 'AUTH_USER_SET', authUser }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication

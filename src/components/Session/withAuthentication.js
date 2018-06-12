import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LogRocket from 'logrocket'
import { loadThumbURL } from '../../reducers/profileThumb'
import { firebase, db } from '../../firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)
      this.state = { ready: false, user: null }
    }
    componentDidMount() {
      const { onSetAuthUser, onGetUserProfile, loadThumbUrl } = this.props

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          LogRocket.identify(authUser.uid, {
            email: authUser.email,
          })
          onSetAuthUser(authUser)
          db.onceGetUserById(authUser.uid).then(snap => {
            onGetUserProfile(snap.val())
            loadThumbUrl(authUser.uid)
            this.setState(() => ({ ready: true, user: authUser }))
          })
        } else {
          onSetAuthUser(null)
          this.setState(() => ({ ready: true, user: authUser }))
        }
      })
    }

    render() {
      return <Component ready={this.state.ready} user={this.state.user} />
    }
  }

  WithAuthentication.propTypes = {
    onSetAuthUser: PropTypes.func,
    onGetUserProfile: PropTypes.func,
    loadThumbUrl: PropTypes.func,
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: 'AUTH_USER_SET', authUser }),
    loadThumbUrl: uid => dispatch(loadThumbURL(uid)),
    onGetUserProfile: userProfile => dispatch({ type: 'SET_USER_PROFILE', userProfile }),
  })

  return connect(
    null,
    mapDispatchToProps,
  )(WithAuthentication)
}

export default withAuthentication

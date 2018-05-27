import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { firebase } from '../../firebase'
import * as routes from '../../constants/routes'

const withAuthorization = (condition, profileCondition = null) => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      if (profileCondition !== null && !profileCondition(this.props.profile)) {
        this.props.history.push(routes.NOT_ALLOWED)
      }
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }

    render() {
      return this.props.authUser ? <Component /> : null
    }
  }

  WithAuthorization.propTypes = {
    authUser: PropTypes.object,
    history: PropTypes.object,
    profile: PropTypes.object,
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    profile: state.firebase.profile,
  })

  return compose(withRouter, connect(mapStateToProps))(WithAuthorization)
}

// withAuthorization.propTypes = {
//   condition: PropTypes.func,
//   profileCondition: PropTypes.func,
// }

export default withAuthorization

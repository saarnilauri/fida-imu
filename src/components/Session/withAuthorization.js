import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { firebase } from '../../firebase'
import * as routes from '../../constants/routes'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
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
    history: PropTypes.array,
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  })

  return compose(withRouter, connect(mapStateToProps))(WithAuthorization)
}

withAuthorization.propTypes = {
  condition: PropTypes.func,
}

export default withAuthorization

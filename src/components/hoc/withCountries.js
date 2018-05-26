import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLoadEntityCollectionActionCreator } from '../../reducers/curriedFirebase'
import { collectionToArrayWithLabelAndValue } from '../../constants/utils'

export default function withCountries(WrappedComponent) {
  const entityName = 'country'
  const loadCountries = getLoadEntityCollectionActionCreator(entityName)

  const mapDispatchToProps = dispatch => ({
    loadCountries: () => dispatch(loadCountries('Countries loaded...')),
  })

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    data:
      state.countryState.collectionReady === true
        ? collectionToArrayWithLabelAndValue(state.countryState.countriesCollection, 'name')
        : [],
    ready: state.countryState.collectionReady,
  })

  // ...and returns another component...
  class WithCountries extends Component {
    static propTypes = {
      loadCountries: PropTypes.func,
      ready: PropTypes.bool,
    }
    componentDidMount() {
      if (!this.props.ready) {
        this.props.loadCountries()
      }
    }

    render() {
      const { ready } = this.props

      return ready ? <WrappedComponent {...this.props} /> : null
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithCountries)
}

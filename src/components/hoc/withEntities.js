import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLoadEntityCollectionActionCreator } from '../../reducers/curriedFirebase'
import { collectionToArrayWithLabelAndValue, getWordForms } from '../../constants/utils'

const withEntities = entity => WrappedComponent => {
  const wordForms = getWordForms(entity)
  const loadEntities = getLoadEntityCollectionActionCreator(entity)

  const mapDispatchToProps = dispatch => ({
    loadEntities: () => dispatch(loadEntities(`${wordForms.capitalizedPrural} loaded...`)),
  })

  const mapStateToProps = state => {
    return {
      authUser: state.sessionState.authUser,
      data:
        state[`${entity}State`].collectionReady === true
          ? collectionToArrayWithLabelAndValue(state[`${entity}State`][`${wordForms.prular}Collection`], 'name')
          : [],
      ready: state[`${entity}State`].collectionReady,
    }
  }

  // ...and returns another component...
  class WithEntities extends Component {
    componentDidMount() {
      if (!this.props.ready) {
        this.props.loadEntities()
      }
    }

    render() {
      const { ready } = this.props

      return ready ? <WrappedComponent {...this.props} /> : null
    }
  }

  WithEntities.propTypes = {
    loadEntities: PropTypes.func,
    ready: PropTypes.bool,
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithEntities)
}

export default withEntities

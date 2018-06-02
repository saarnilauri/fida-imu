import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import CenteredLoader from '../CenteredLoader'
import EntityListView from './EntityListView'
import getListActionsColumn from './getListActionsCol'
import { getEntityListPropTypes } from './EntityPropTypes'
import { getListMapStateToProps } from './helperFunctions'
import { getMapDispatchToProps } from '../../reducers/curriedFirebase'
import { getWordForms } from '../../constants/utils'

const getCleanState = () => ({
  modalIsOpen: false,
  uid: null,
})
const getEntityList = (entity, settings) => {
  const wordForms = getWordForms(entity)
  class EntityList extends Component {
    constructor(props) {
      super(props)
      this.state = getCleanState()
      this.removeEntity = this.removeEntity.bind(this)
      this.cancelRemove = this.cancelRemove.bind(this)
      this.promptRemove = this.promptRemove.bind(this)
      this.setTableSettings()
    }

    componentDidMount() {
      // eslint-disable-next-line
      // if (!this.props.ready) {
      //  this.props[`load${wordForms.capitalizedPrular}`]()
      // }
    }

    setTableSettings() {
      const { formatMessage } = this.props.intl // eslint-disable-line
      this.tableColumns = settings.tableColumns.map(column => ({
        Header: formatMessage({ id: `${entity}.list.table.header.${column}` }),
        accessor: column,
      }))
      this.tableColumns.push(
        getListActionsColumn({
          formatMessage,
          edit: this.props.edit, // eslint-disable-line
          promptRemove: this.promptRemove,
        }),
      )
    }

    cancelRemove() {
      this.setState(getCleanState())
    }

    promptRemove(uid) {
      this.setState(() => ({
        uid,
        modalIsOpen: true,
      }))
    }

    removeEntity() {
      const { uid } = this.state
      this.props[`remove${wordForms.capitalized}`](uid)
      this.cancelRemove()
    }

    render() {
      const { modalIsOpen } = this.state
      const { ready, data } = this.props // eslint-disable-line
      const { formatMessage } = this.props.intl
      const view = ready ? (
        <EntityListView
          formatMessage={formatMessage}
          data={data}
          tableColumns={this.tableColumns}
          tableSort={settings.tableSort}
          entity={entity}
          modalIsOpen={modalIsOpen}
          removeEntity={this.removeEntity}
          cancelRemove={this.cancelRemove}
        />
      ) : (
        <CenteredLoader />
      )
      return view
    }
  }
  EntityList.propTypes = getEntityListPropTypes(wordForms)
  const mapDispatchToProps = getMapDispatchToProps(entity)
  const mapStateToProps = getListMapStateToProps(entity)
  return compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(EntityList)
}

export default getEntityList

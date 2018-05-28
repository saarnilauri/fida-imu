import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import CenteredLoader from '../../CenteredLoader'
import Modal from '../../Modal'
import FlagIcon from '../../FlagIcon'
import EditAndRemove from '../../ButtonGroup/EditAndRemove'

import { collectionToArray } from '../../../constants/utils'
import { getMapDispatchToProps } from '../../../reducers/curriedFirebase'

const getCleanState = () => ({
  modalIsOpen: false,
  uid: null,
})
class CountryList extends Component {
  constructor(props) {
    super(props)
    this.state = getCleanState()
    this.removeCountry = this.removeCountry.bind(this)
    this.cancelRemove = this.cancelRemove.bind(this)
    this.setTableSettings()
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadCountries()
    }
  }

  setTableSettings() {
    const { formatMessage } = this.props.intl
    this.tableColumns = [
      {
        id: 'flag',
        width: 30,
        accessor: d => <FlagIcon code={d.code} />,
      },
      {
        Header: formatMessage({ id: 'country.list.table.header.name' }),
        accessor: 'name',
      },
      {
        Header: formatMessage({ id: 'country.list.table.header.area' }),
        accessor: 'area',
      },
      {
        Header: formatMessage({ id: 'country.list.table.header.actions' }),
        id: 'edit',
        width: 100,
        accessor: d => (
          <EditAndRemove
            editTitleAttr={formatMessage({ id: 'actions.edit' })}
            removeTitleAttr={formatMessage({ id: 'actions.remove' })}
            onClickEdit={() => this.props.edit(d.uid)}
            onClickRemove={() => this.promptRemoveCountry(d.uid)}
          />
        ),
      },
    ]
    this.tableSort = [{ id: 'name' }]
  }

  cancelRemove() {
    this.setState(getCleanState())
  }

  promptRemoveCountry(uid) {
    this.setState(() => ({
      uid,
      modalIsOpen: true,
    }))
  }

  removeCountry() {
    const { uid } = this.state
    const { removeCountry } = this.props

    removeCountry(uid)
    this.cancelRemove()
  }

  render() {
    const { modalIsOpen } = this.state
    const { ready, data } = this.props
    const { formatMessage } = this.props.intl
    const view = ready ? (
      <React.Fragment>
        <ReactTable
          data={data}
          columns={this.tableColumns}
          defaultSorted={this.tableSort}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <Modal
          isOpen={modalIsOpen}
          action={this.removeCountry}
          cancel={this.cancelRemove}
          title={formatMessage({ id: 'modal.header.please_confirm' })}
          className="modal-danger"
          titleIcon="exclamation-circle"
          actionBtnIcon="trash"
          cancelBtnTitle={formatMessage({ id: 'modal.actions.cancel' })}
          actionBtnTitle={formatMessage({ id: 'modal.actions.yes_remove' })}
        >
          {formatMessage({ id: 'coyntry.list.modal.question.remove_country' })}
        </Modal>
      </React.Fragment>
    ) : (
      <CenteredLoader />
    )
    return view
  }
}

CountryList.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.object,
  loadCountries: PropTypes.func,
  ready: PropTypes.bool,
  removeCountry: PropTypes.func,
  edit: PropTypes.func,
}

const mapDispatchToProps = getMapDispatchToProps('country')

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  data: state.countryState.collectionReady === true ? collectionToArray(state.countryState.countriesCollection) : [],
  ready: state.countryState.collectionReady,
})

export default compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(CountryList)

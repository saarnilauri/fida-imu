import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import Modal from '../Modal'

const EntityListView = props => {
  const { formatMessage, data, tableColumns, tableSort, entity, modalIsOpen, removeEntity, cancelRemove } = props
  return (
    <React.Fragment>
      <ReactTable
        data={data}
        columns={tableColumns}
        defaultSorted={tableSort}
        defaultPageSize={10}
        className="-striped -highlight"
        previousText={formatMessage({ id: 'datatable.pagination.previous' })}
        nextText={formatMessage({ id: 'datatable.pagination.next' })}
        loadingText={formatMessage({ id: 'datatable.loading' })}
        noDataText={formatMessage({ id: `${entity}.datatable.now-rows-found` })}
        pageText={formatMessage({ id: 'datatable.page' })}
        ofText={formatMessage({ id: 'datatable.of' })}
        rowsText={formatMessage({ id: 'datatable.rows' })}
      />
      <Modal
        isOpen={modalIsOpen}
        action={removeEntity}
        cancel={cancelRemove}
        title={formatMessage({ id: 'modal.header.please_confirm' })}
        className="modal-danger"
        titleIcon="exclamation-circle"
        actionBtnIcon="trash"
        cancelBtnTitle={formatMessage({ id: 'modal.actions.cancel' })}
        actionBtnTitle={formatMessage({ id: 'modal.actions.yes_remove' })}
      >
        {formatMessage({ id: `${entity}.list.modal.question.remove` })}
      </Modal>
    </React.Fragment>
  )
}

EntityListView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  data: PropTypes.array,
  tableColumns: PropTypes.array,
  tableSort: PropTypes.array,
  entity: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  removeEntity: PropTypes.func.isRequired,
  cancelRemove: PropTypes.func.isRequired,
}

export default EntityListView

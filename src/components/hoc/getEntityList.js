import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import ReactTable from "react-table";

import CenteredLoader from "../CenteredLoader";
import Modal from "../Modal";
import EditAndRemove from "../ButtonGroup/EditAndRemove";

import { collectionToArray, getWordForms } from "../../constants/utils";
import { getMapDispatchToProps } from "../../reducers/curriedFirebase";

const getCleanState = () => ({
  modalIsOpen: false,
  uid: null
});
const getEntityList = (entity, settings) => {
  const wordForms = getWordForms(entity);
  class EntityList extends Component {
    constructor(props) {
      super(props);
      this.state = getCleanState();
      this.removeEntity = this.removeEntity.bind(this);
      this.cancelRemove = this.cancelRemove.bind(this);
      this.promptRemove = this.promptRemove.bind(this);
      this.setTableSettings();
    }

    componentDidMount() {
      if (!this.props.ready) {
        // this.props[`load${wordForms.capitalizedPlural}`]()
      }
    }

    setTableSettings() {
      const { formatMessage } = this.props.intl;
      this.tableColumns = settings.tableColumns.map(column => ({
        Header: formatMessage({ id: `${entity}.list.table.header.${column}` }),
        accessor: column
      }));
      this.tableColumns.push({
        Header: formatMessage({ id: "country.list.table.header.actions" }),
        id: "edit",
        width: 100,
        accessor: d => (
          <EditAndRemove
            editTitleAttr={formatMessage({ id: "actions.edit" })}
            removeTitleAttr={formatMessage({ id: "actions.remove" })}
            onClickEdit={() => this.props.edit(d.uid)}
            onClickRemove={() => this.promptRemove(d.uid)}
          />
        )
      });
    }

    cancelRemove() {
      this.setState(getCleanState());
    }

    promptRemove(uid) {
      this.setState(() => ({
        uid,
        modalIsOpen: true
      }));
    }

    removeEntity() {
      const { uid } = this.state;
      this.props[`remove${wordForms.capitalized}`](uid);
      this.cancelRemove();
    }

    render() {
      const { modalIsOpen } = this.state;
      const { ready, data } = this.props;
      const { formatMessage } = this.props.intl;
      const view = ready ? (
        <React.Fragment>
          <ReactTable
            data={data}
            columns={this.tableColumns}
            defaultSorted={settings.tableSort}
            defaultPageSize={10}
            className="-striped -highlight"
            previousText={formatMessage({
              id: "datatable.pagination.previous"
            })}
            nextText={formatMessage({ id: "datatable.pagination.next" })}
            loadingText={formatMessage({ id: "datatable.loading" })}
            noDataText={formatMessage({
              id: `${entity}.datatable.now-rows-found`
            })}
            pageText={formatMessage({ id: "datatable.page" })}
            ofText={formatMessage({ id: "datatable.of" })}
            rowsText={formatMessage({ id: "datatable.rows" })}
          />
          <Modal
            isOpen={modalIsOpen}
            action={this.removeEntity}
            cancel={this.cancelRemove}
            title={formatMessage({ id: "modal.header.please_confirm" })}
            className="modal-danger"
            titleIcon="exclamation-circle"
            actionBtnIcon="trash"
            cancelBtnTitle={formatMessage({ id: "modal.actions.cancel" })}
            actionBtnTitle={formatMessage({ id: "modal.actions.yes_remove" })}
          >
            {formatMessage({ id: `${entity}.list.modal.question.remove` })}
          </Modal>
        </React.Fragment>
      ) : (
        <CenteredLoader />
      );
      return view;
    }
  }

  const mapDispatchToProps = getMapDispatchToProps(entity);

  EntityList.propTypes = {
    data: PropTypes.array,
    intl: PropTypes.object,
    [`load${wordForms.capitalizedPlural}`]: PropTypes.func, // eslint-disable-line
    ready: PropTypes.bool,
    edit: PropTypes.func,
    [`remove${wordForms.capitalized}`]: PropTypes.func // eslint-disable-line
  };

  const mapStateToProps = state => {
    return {
      authUser: state.sessionState.authUser,
      data:
        state[`${entity}State`].collectionReady === true
          ? collectionToArray(
              state[`${entity}State`][`${wordForms.prular}Collection`]
            )
          : [],
      ready: state[`${entity}State`].collectionReady
    };
  };
  return compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(
    EntityList
  );
};

export default getEntityList;

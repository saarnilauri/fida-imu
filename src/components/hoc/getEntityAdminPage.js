import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { Col, Row } from "reactstrap";

import Card from "../Card";
import PageTitle from "../PageTitle";
import PageWrapper from "../PageWrapper";
import getEntityForm from "./getEntityForm";
import getEntityList from "./getEntityList";

import {
  updateByPropertyName,
  collectionToArray,
  getSchemaKeys,
  getWordForms
} from "../../constants/utils";
import { getMapDispatchToProps } from "../../reducers/curriedFirebase";

const getEntityAdminPage = (entity, settings) => {
  const wordForms = getWordForms(entity);
  const EntityForm = getEntityForm(entity, settings.form.fields);
  const EntityList = getEntityList(entity, settings.list.settings);

  class EntityListPage extends Component {
    constructor(props) {
      super(props);

      this.schema = Object.keys(settings.form.fields);

      this.state = {
        ...settings.initialState,
        editMode: false,
        uid: null,
        data: props.data.lenght > 0 ? props.data : []
      };
      this.editEntity = this.editEntity.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
      this.handleValueChange = this.handleValueChange.bind(this);
      this.getFieldValueFromState = this.getFieldValueFromState.bind(this);
    }

    componentDidMount() {
      if (!this.props.ready) {
        this.props[`load${wordForms.capitalizedPrular}`]();
      }
    }

    onSubmit(e) {
      const cleanProps = getSchemaKeys(this.state, this.schema);
      const { uid } = this.state;
      const data = {};

      cleanProps.forEach(key => {
        data[key] = this.state[key];
      });

      if (uid === null) {
        this.props[`add${wordForms.capitalized}`](data);
      } else {
        this.props[`update${wordForms.capitalized}`](uid, data);
      }

      this.setState(() => ({
        ...settings.cleanState,
        editMode: false,
        uid: null
      }));

      e.preventDefault();
    }

    getFieldValueFromState(key) {
      return this.state[key];
    }
    editEntity(uid) {
      const { data } = this.props;
      this.setState(() => ({
        ...data.find(item => item.uid === uid),
        editMode: true
      }));
    }
    handleValueChange(event) {
      this.setState(updateByPropertyName(event.target.id, event.target.value));
    }
    cancelEdit() {
      this.setState(() => ({
        ...settings.cleanState,
        editMode: false,
        uid: null
      }));
    }

    render() {
      const { area, name, code, error, editMode } = this.state;
      const { formatMessage } = this.props.intl;
      return (
        <React.Fragment>
          <PageTitle
            title={formatMessage({ id: `${entity}.list.page.header` })}
          />
          <PageWrapper>
            <Row>
              <Col md="9">
                <Card
                  title={formatMessage({ id: `${entity}.list.page.subheader` })}
                  noPadding
                >
                  <EntityList edit={this.editEntity} entity={entity} />
                </Card>
              </Col>
              <Col md="3">
                <Card
                  title={
                    editMode
                      ? formatMessage({
                          id: `${entity}.list.page.form.title.edit`
                        })
                      : formatMessage({
                          id: `${entity}.list.page.form.title.add_new`
                        })
                  }
                  headerClass={editMode ? "bg-secondary text-white" : ""}
                >
                  <EntityForm
                    // entity={entity}
                    onSubmit={this.onSubmit}
                    error={error}
                    onValueChange={this.handleValueChange}
                    getValue={this.getFieldValueFromState}
                    onAreaChange={event =>
                      this.setState(
                        updateByPropertyName("area", event.target.value)
                      )
                    }
                    name={name}
                    area={area}
                    code={code}
                    editMode={editMode}
                    cancelEdit={this.cancelEdit}
                  />
                </Card>
              </Col>
            </Row>
          </PageWrapper>
        </React.Fragment>
      );
    }
  }

  EntityListPage.propTypes = {
    [`add${wordForms.capitalized}`]: PropTypes.func, // eslint-disable-line
    data: PropTypes.array,
    intl: PropTypes.object,
    [`load${wordForms.capitalizedPlural}`]: PropTypes.func, // eslint-disable-line
    ready: PropTypes.bool,
    [`update${wordForms.capitalized}`]: PropTypes.func // eslint-disable-line
  };

  const mapDispatchToProps = getMapDispatchToProps(entity);

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

  return compose(
    injectIntl,
    connect(
      settings.mapStateToProps ? settings.mapStateToProps : mapStateToProps,
      settings.mapDispatchToProps
        ? settings.mapDispatchToProps
        : mapDispatchToProps
    )
  )(EntityListPage);
};

export default getEntityAdminPage;

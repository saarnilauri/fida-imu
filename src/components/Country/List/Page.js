import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { Col, Row } from "reactstrap";

import Card from "../../Card";
import PageTitle from "../../PageTitle";
import PageWrapper from "../../PageWrapper";
import CountryListForm from "./Form";
import CountryList from "./index";

import {
  updateByPropertyName,
  collectionToArray,
  getSchemaKeys
} from "../../../constants/utils";
import { getMapDispatchToProps } from "../../../reducers/curriedFirebase";

const getCleanState = () => ({
  area: "",
  code: "",
  editMode: false,
  name: "",
  uid: null
});

class CountryListPage extends Component {
  constructor(props) {
    super(props);

    this.schema = ["name", "area", "code"];

    this.state = {
      ...getCleanState(),
      data: props.data.lenght > 0 ? props.data : []
    };
    this.editCountry = this.editCountry.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadCountries();
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
      this.props.addCountry(data);
    } else {
      this.props.updateCountry(uid, data);
    }

    this.setState(getCleanState());

    e.preventDefault();
  }

  cancelEdit() {
    this.setState(getCleanState());
  }

  cancelRemove() {
    this.setState(getCleanState());
  }

  editCountry(uid) {
    const { data } = this.props;
    this.setState(() => ({
      ...data.find(item => item.uid === uid),
      editMode: true
    }));
  }
  render() {
    const { area, name, code, error, editMode } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <React.Fragment>
        <PageTitle title={formatMessage({ id: "country.list.page.header" })} />
        <PageWrapper>
          <Row>
            <Col md="9">
              <Card
                title={formatMessage({ id: "country.list.page.subheader" })}
                noPadding
              >
                <CountryList edit={this.editCountry} />
              </Card>
            </Col>
            <Col md="3">
              <Card
                title={
                  editMode
                    ? formatMessage({ id: "country.list.page.form.title.edit" })
                    : formatMessage({
                        id: "country.list.page.form.title.add_new"
                      })
                }
                headerClass={editMode ? "bg-secondary text-white" : ""}
              >
                <CountryListForm
                  onSubmit={this.onSubmit}
                  error={error}
                  onNameChange={event =>
                    this.setState(
                      updateByPropertyName("name", event.target.value)
                    )
                  }
                  onCodeChange={event =>
                    this.setState(
                      updateByPropertyName("code", event.target.value)
                    )
                  }
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
CountryListPage.propTypes = {
  addCountry: PropTypes.func,
  data: PropTypes.array,
  intl: PropTypes.object,
  loadCountries: PropTypes.func,
  ready: PropTypes.bool,
  updateCountry: PropTypes.func
};

const mapDispatchToProps = getMapDispatchToProps("country");

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  data:
    state.countryState.collectionReady === true
      ? collectionToArray(state.countryState.countriesCollection)
      : [],
  ready: state.countryState.collectionReady
});

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(CountryListPage);

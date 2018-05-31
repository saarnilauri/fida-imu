import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { injectIntl } from "react-intl";
import { Row, Col, Container } from "reactstrap";
import PageTitle from "../PageTitle";
import Card from "../Card";
import UserProfileForm from "../UserProfileForm";

import getEntityImageDropZone from "../hoc/getEntityImageDropZone";
// authUser.email
const AccountPage = props => {
  const ImageDropZone = getEntityImageDropZone(
    "user",
    false,
    props.authUser.uid
  );
  return (
    <div>
      <PageTitle
        title={props.intl.formatMessage({ id: "account.page.title" })}
      />
      <Container fluid>
        <Row className="full-height d-flex justify-content-left align-items-top py-4">
          <Col md="6" className="fadeIn animated">
            <Card
              title={props.intl.formatMessage(
                { id: "account.page.subtitle" },
                { name: props.authUser.email }
              )}
            >
              <UserProfileForm formatMessage={props.intl.formatMessage} />
            </Card>
          </Col>
          <Col md="4">
            <Card
              title={props.intl.formatMessage({
                id: "account.page.profile.picture"
              })}
            >
              <ImageDropZone />
            </Card>
          </Col>
        </Row>
        <div className="half-page-image tuktuk">
          <p>Image by: aaaa</p>
        </div>
      </Container>
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default compose(injectIntl, connect(mapStateToProps))(AccountPage);

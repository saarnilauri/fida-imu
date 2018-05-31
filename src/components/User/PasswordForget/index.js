import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, CardBody, Card, Col, Row } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { auth } from "../../../firebase";
import * as routes from "../../../constants/routes";
import { updateByPropertyName, setStateValue } from "../../../constants/utils";
import ErrorMsg from "../../ErrorMsg";
import PageWrapper from "../PageWrapper";
import { EmailField } from "../../FormGroupElement/FormFields";
import { LoginLangMenu } from "../Login";

const PasswordForgetPage = () => (
  <PageWrapper>
    <Card className="p-4">
      <CardBody style={{ position: "relative" }}>
        <h1 className="small-h1">
          <FormattedMessage id="app.pwd-forgot.header" />
        </h1>
        <p>
          <FormattedMessage id="app.pwd-forgot.intro" />
        </p>
        <PasswordForgetForm />
        <LoginLangMenu />
      </CardBody>
    </Card>
    <Card
      className="text-white bg-primary py-5 d-md-down-none"
      style={{ width: `${44}%` }}
    >
      <CardBody className="text-center">
        <div className="flex-row align-items-center">
          <div>
            <img
              className="img-fluid rounded img-thumbnail"
              alt="Fida"
              style={{ maxWidth: 160 }}
              src="https://goo.gl/bHV9uq"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  </PageWrapper>
);

const INITIAL_STATE = {
  email: "",
  error: null,
  loading: false
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.setState(updateByPropertyName("loading", true));

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error, loading } = this.state;

    const isInvalid = email === "" || loading === true;

    return (
      <form onSubmit={this.onSubmit}>
        {error && <ErrorMsg error={error.message} />}
        <EmailField value={email} onChange={setStateValue("email", this)} />
        <Row>
          <Col xs="6">
            <Button color="secondary" disabled={isInvalid} type="submit">
              <FormattedMessage id="app.pwd-forgot.reset-pwd" />
            </Button>
          </Col>
          <Col xs="6" className="text-right">
            <Link className="px-0" to={routes.SIGN_IN}>
              <FormattedMessage id="app.pwd-forgot.login" />
            </Link>
          </Col>
        </Row>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };

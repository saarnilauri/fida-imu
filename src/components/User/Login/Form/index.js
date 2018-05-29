import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Button, Col, Row } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { EmailField, PasswordField } from '../../../FormGroupElement/FormFields'

const LoginForm = props => (
  <React.Fragment>
    <EmailField mb="3" value={props.email} onChange={props.onChangeEmail} />
    <PasswordField mb="4" value={props.password} onChange={props.onChangePassword} />
    <Row>
      <Col xs={props.forgotPasswordRoute ? '6' : '12'}>
        <Button color="secondary" disabled={props.isInvalid} type="submit">
          <FontAwesome name="sign-in" /> <FormattedMessage id="app.login.form.sign-in" />
        </Button>
      </Col>
      {props.forgotPasswordRoute && (
        <Col xs="6" className="text-right">
          <Link className="px-0" to={props.forgotPasswordRoute}>
            <FormattedMessage id="app.login.form.forgot-pwd" />
          </Link>
        </Col>
      )}
    </Row>
  </React.Fragment>
)

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  isInvalid: PropTypes.bool,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  forgotPasswordRoute: PropTypes.string,
}

export default LoginForm

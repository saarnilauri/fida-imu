import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Alert, CardBody, Card, Col, Row } from 'reactstrap'
import { auth } from '../../../firebase'
import * as routes from '../../../constants/routes'
import PageWrapper from '../PageWrapper'
import { EmailField, setStateValue } from '../../FormElement/FormFields'

import logo from '../../../assets/img/brand/fida_logo.svg'

const PasswordForgetPage = () => (
  <PageWrapper>
    <Card className="p-4">
      <CardBody>
        <h1 className="small-h1">Forgot your password?</h1>
        <p>No worries. Please fill in the form bellow to start recovering your email.</p>
        <PasswordForgetForm />
      </CardBody>
    </Card>
    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: `${44}%` }}>
      <CardBody className="text-center">
        <div className="flex-row align-items-center">
          <div>
            <img alt="Fida" src={logo} width="120" height="120" />
          </div>
        </div>
      </CardBody>
    </Card>
  </PageWrapper>
)

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
  loading: false,
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    this.setState(updateByPropertyName('loading', true))

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, error, loading } = this.state

    const isInvalid = email === '' || loading === true

    return (
      <form onSubmit={this.onSubmit}>
        {error && <Alert color="danger">{error.message}</Alert>}
        <EmailField value={email} onChange={setStateValue('email', this)} />
        <Row>
          <Col xs="6">
            <Button color="secondary" disabled={isInvalid} type="submit">
              Reset My Password
            </Button>
          </Col>
          <Col xs="6" className="text-right">
            <Link className="px-0" to={routes.SIGN_IN}>
              Login
            </Link>
          </Col>
        </Row>
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }

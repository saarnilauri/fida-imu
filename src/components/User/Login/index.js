import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../firebase'
import * as routes from '../../../constants/routes'
import { setStateValue } from '../../FormGroupElement/FormFields'
import LoginForm from './Form'
import PageWrapper from '../PageWrapper'
import logo from '../../../assets/img/brand/fida_logo.svg'

const SignInPage = ({ history }) => (
  <PageWrapper>
    <Card className="p-4">
      <CardBody>
        <h1 className="small-h1">Login to IMU reporting</h1>
        <p className="text-muted">Sign In to your account</p>
        <SignInForm history={history} />
      </CardBody>
    </Card>
    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: `${44}%` }}>
      <CardBody className="text-center">
        <div>
          <p>
            <img alt="Fida" src={logo} width="60" height="60" />
          </p>
          <p>This service is made to empower Fida personel working around the globe.</p>
        </div>
      </CardBody>
    </Card>
  </PageWrapper>
)

SignInPage.propTypes = {
  history: PropTypes.array,
}

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    const { history } = this.props
    this.setState(updateByPropertyName('loading', true))
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
        this.setState(updateByPropertyName('loading', true))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error, loading } = this.state

    const isInvalid = password === '' || email === '' || loading === true

    return (
      <form onSubmit={this.onSubmit} className="py-2">
        {error && <Alert color="danger">{error.message}</Alert>}
        <LoginForm
          email={email}
          password={password}
          isInvalid={isInvalid}
          onChangeEmail={setStateValue('email', this)}
          onChangePassword={setStateValue('password', this)}
          forgotPasswordRoute={routes.PASSWORD_FORGET}
        />
      </form>
    )
  }
}

SignInForm.propTypes = {
  history: PropTypes.array,
}

export default withRouter(SignInPage)

export { SignInForm }

// export default Login

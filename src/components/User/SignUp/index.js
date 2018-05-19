import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Alert, Button, Card, CardBody } from 'reactstrap'
import * as routes from '../../../constants/routes'
import PageWrapper from '../PageWrapper'
import logo from '../../../assets/img/brand/fida_logo.svg'
import { UsernameField, EmailField, PasswordConfirmField, setStateValue } from '../../FormGroupElement/FormFields'

const SignUpPage = ({ history }) => (
  <PageWrapper>
    <Card className="p-4">
      <CardBody>
        <h1 className="small-h1">Sign up to IMU reporting</h1>
        <SignUpForm history={history} />
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

SignUpPage.propTypes = {
  history: PropTypes.array,
}

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state

    const { history } = this.props
    /*
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error))
          })
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })
      */
    event.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || username === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        {error && (
          <div className="py-2">
            <Alert color="danger">{error.message}</Alert>
          </div>
        )}
        <UsernameField value={username} onChange={setStateValue('username', this)} />
        <EmailField value={email} onChange={setStateValue('email', this)} />
        <PasswordConfirmField
          passwordOne={passwordOne}
          onChangeOne={setStateValue('passwordOne', this)}
          passwordTwo={passwordTwo}
          onChangeTwo={setStateValue('passwordTwo', this)}
        />
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  history: PropTypes.array,
}

const SignUpLink = () => (
  <p>
    Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
)

export default withRouter(SignUpPage)

export { SignUpForm, SignUpLink }

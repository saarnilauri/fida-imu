import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Alert, Button } from 'reactstrap'
import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import {
  UsernameField,
  EmailField,
  PasswordConfirmField,
} from '../FormElement/FormFields'

const SignUpPage = ({ history }) => (
  <div>
    <PageTitle title="Sign Up" />
    <PageWrapper>
      <Card title="Sign Up with your email and password">
        <SignUpForm history={history} />
      </Card>
    </PageWrapper>
  </div>
)

SignUpPage.propTypes = {
  history: PropTypes.array,
}

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

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

    event.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === ''

    return (
      <form onSubmit={this.onSubmit}>
        {error && (
          <div className="py-2">
            <Alert color="danger">{error.message}</Alert>
          </div>
        )}
        <UsernameField
          value={username}
          onChange={event =>
            this.setState(updateByPropertyName('username', event.target.value))
          }
        />
        <EmailField
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
        />
        <PasswordConfirmField
          passwordOne={passwordOne}
          onChangeOne={event =>
            this.setState(
              updateByPropertyName('passwordOne', event.target.value),
            )
          }
          passwordTwo={passwordTwo}
          onChangeTwo={event =>
            this.setState(
              updateByPropertyName('passwordTwo', event.target.value),
            )
          }
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

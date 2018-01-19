import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Alert, Button } from 'reactstrap'
import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import FormElement from '../FormElement'

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
    const {
      username, email, passwordOne, passwordTwo, error,
    } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || username === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        {error && (
          <div className="py-2">
            <Alert color="danger">{error.message}</Alert>
          </div>
        )}
        <FormElement
          className=""
          value={username}
          name="username"
          id="username"
          label="Full Name"
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder=""
        />
        <FormElement
          className="py-2"
          value={email}
          name="email"
          id="email"
          label="Email"
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="name@example.com"
        />
        <FormElement
          className=""
          name="passwordOne"
          id="passwordOne"
          label="Password"
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder=""
        />
        <FormElement
          className="py-2"
          name="passwordTwo"
          id="passwordTwo"
          label="Confirm Password"
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder=""
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

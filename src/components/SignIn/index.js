import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Alert } from 'reactstrap'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { auth } from '../../firebase'
import * as routes from '../../constants/routes'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import FormElement from '../FormElement'

const SignInPage = ({ history }) => (
  <div>
    <PageTitle title="Sign In" />
    <PageWrapper>
      <Card title="Sign In with your email and password">
        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
      </Card>
    </PageWrapper>
  </div>
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
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit} className="py-2">
        {error && <Alert color="danger">{error.message}</Alert>}
        <FormElement
          className="py-2"
          value={email}
          name="email"
          id="email"
          label="Email"
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <FormElement
          className="py-2"
          name="password"
          id="password"
          label="Password"
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>
      </form>
    )
  }
}

SignInForm.propTypes = {
  history: PropTypes.array,
}

export default withRouter(SignInPage)

export { SignInForm }

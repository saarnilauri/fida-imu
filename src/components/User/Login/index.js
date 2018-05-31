import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Nav } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { auth } from '../../../firebase'
import * as routes from '../../../constants/routes'
import { updateByPropertyName, setStateValue } from '../../../constants/utils'
import LoginForm from './Form'
import ErrorMsg from '../../ErrorMsg'
import PageWrapper from '../PageWrapper'
import LanguageMenu from '../../LanguageSwitch/Menu'

export const LoginLangMenu = () => (
  <div style={{ position: 'absolute', top: -10, right: 0 }}>
    <Nav className="ml-auto align-right" navbar>
      <LanguageMenu />
    </Nav>
  </div>
)
const SignInPage = ({ history }) => (
  <PageWrapper>
    <Card className="p-4">
      <CardBody style={{ position: 'relative' }}>
        <h1 className="small-h1">
          <FormattedMessage id="app.login.header" />
        </h1>
        <p className="text-muted">
          <FormattedMessage id="app.login.intro" />
        </p>
        <SignInForm history={history} />
        <LoginLangMenu />
      </CardBody>
    </Card>
    <Card className="text-white bg-primary py-5 d-md-down-none">
      <CardBody className="text-center">
        <div>
          <p>
            <img
              className="img-fluid rounded img-thumbnail"
              alt="Fida"
              style={{ maxWidth: 160 }}
              src="https://goo.gl/bHV9uq"
            />
          </p>
          <p>
            <FormattedMessage id="app.login.copyright" />
          </p>
        </div>
      </CardBody>
    </Card>
  </PageWrapper>
)

SignInPage.propTypes = {
  history: PropTypes.object,
}

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
        this.setState(updateByPropertyName('loading', false))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error, loading } = this.state

    const isInvalid = password === '' || email === '' || loading === true

    return (
      <form onSubmit={this.onSubmit} className="py-2">
        {error && <ErrorMsg error={error.message} />}
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
  history: PropTypes.object,
}

export default withRouter(SignInPage)

export { SignInForm }

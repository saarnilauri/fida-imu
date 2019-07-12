import React from 'react'
import PropTypes from 'prop-types'
import { branch, renderComponent } from 'recompose'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import en from 'react-intl/locale-data/en'
import fi from 'react-intl/locale-data/fi'
import { addLocaleData, defineMessages, IntlProvider } from 'react-intl'

import CenteredLoader from '../CenteredLoader'
import withAuthentication from '../Session/withAuthentication'
import Layout from '../Layout'
import Login from '../User/Login'
import PasswordForget from '../User/PasswordForget'
import SignUpPage from '../User/SignUp'
import enLocale from '../../locale/en.json'
import fiLocale from '../../locale/fi.json'

addLocaleData([...en, ...fi])

const messages = {
  en: defineMessages(enLocale),
  fi: defineMessages(fiLocale),
}

const EnhancedLayout = withAuthentication(
  branch(props => !props.ready, renderComponent(CenteredLoader))(Layout),
)

const App = ({ locale }) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login} />
        <Route
          exact
          path="/forgot"
          name="Forgot password Page"
          component={PasswordForget}
        />
        <Route
          exact
          path="/signup"
          name="Sign-up Page"
          component={SignUpPage}
        />
        <Route path="/" name="Home" component={EnhancedLayout} />
        {
          // <Route exact path="/register" name="Register Page" component={Register} />
        }
      </Switch>
    </HashRouter>
  </IntlProvider>
)

App.propTypes = { locale: PropTypes.string.isRequired }

const mapStateToProps = state => ({ locale: state.userLocaleState.locale })

export default connect(mapStateToProps)(App)

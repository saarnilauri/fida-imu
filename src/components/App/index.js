import React from 'react'
import { branch, renderComponent } from 'recompose'
import { HashRouter, Route, Switch } from 'react-router-dom'
import CenteredLoader from '../CenteredLoader'
import withAuthentication from '../Session/withAuthentication'
import Layout from '../Layout'
import Login from '../User/Login'
import PasswordForget from '../User/PasswordForget'
import SignUpPage from '../User/SignUp'
// import Register from '../Pages/Register'
// import './index.css'

const EnhancedLayout = withAuthentication(branch(props => !props.ready, renderComponent(CenteredLoader))(Layout))

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login} />
      <Route exact path="/forgot" name="Forgot password Page" component={PasswordForget} />
      <Route exact path="/signup" name="Sign-up Page" component={SignUpPage} />
      <Route path="/" name="Home" component={EnhancedLayout} />
      {
        // <Route exact path="/register" name="Register Page" component={Register} />
      }
    </Switch>
  </HashRouter>
)

// export default
export default App

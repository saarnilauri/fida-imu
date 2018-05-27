import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AppFooter, AppHeader } from '@coreui/react'
import uuid from 'uuid'
// sidebar nav config
import routes from '../../routes'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import FidaToast from '../FidaToast'

class Layout extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props
    // console.log(user)
    const view =
      user !== null ? (
        <div className="app">
          <AppHeader fixed>
            <Header {...this.props} />
          </AppHeader>
          <div className="app-body">
            <Sidebar />
            <main className="main">
              <Switch>
                {routes.map(route => {
                  return route.component ? (
                    <Route
                      key={uuid()}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null
                })}
              </Switch>
            </main>
          </div>
          <AppFooter>
            <Footer />
          </AppFooter>
          <FidaToast />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    return view
  }
}

export default Layout

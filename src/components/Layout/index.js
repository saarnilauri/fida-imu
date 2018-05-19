import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav'
import routes from '../../routes'
import Footer from './Footer'
import Header from './Header'

class Layout extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props
    const view =
      user !== null ? (
        <div className="app">
          <AppHeader fixed>
            <Header {...this.props} />
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <AppSidebarNav navConfig={navigation} {...this.props} />
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <Switch>
                {routes.map(route => {
                  return route.component ? (
                    <Route
                      key={Math.random() * 1000}
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
        </div>
      ) : (
        <Redirect to="/login" />
      )
    return view
  }
}

export default Layout

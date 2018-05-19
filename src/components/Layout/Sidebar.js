import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
import navigation from '../../_nav'
import basicNavigation from '../../_basicNav'

const SideBar = props => {
  const userNavi = _.has(props.roles, 'admin') ? navigation : basicNavigation
  return (
    <AppSidebar fixed display="lg">
      <AppSidebarHeader />
      <AppSidebarForm />
      <AppSidebarNav navConfig={userNavi} {...this.props} />
      <AppSidebarFooter />
      <AppSidebarMinimizer />
    </AppSidebar>
  )
}

const mapStateToProps = state => ({
  roles: state.sessionState.userProfile.roles,
})

export default connect(mapStateToProps)(SideBar)

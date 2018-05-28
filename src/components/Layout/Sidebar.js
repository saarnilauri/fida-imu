import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import has from 'lodash/has'
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
  const { formatMessage } = props.intl
  const mapTranslationsToNavi = rawNavigation => {
    Object.keys(rawNavigation.items).forEach(key => {
      // eslint-disable-next-line
      rawNavigation.items[key].name = formatMessage({ id: rawNavigation.items[key].name })
    })
    return rawNavigation
  }
  const userNavi = mapTranslationsToNavi(has(props.roles, 'admin') ? navigation : basicNavigation)
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

SideBar.propTypes = {
  roles: PropTypes.object,
  intl: PropTypes.object,
}

const mapStateToProps = state => ({
  roles: state.sessionState.userProfile.roles,
})

export default compose(injectIntl, connect(mapStateToProps))(SideBar)

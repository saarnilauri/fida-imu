import React, { Component } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react'

import logo from '../../assets/img/brand/fida_logo.svg'
import userIcon from '../../assets/img/user.svg'
import SignOutButton from '../SignOut'
import EnhachedNotification from '../Notifications'

const propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
}

const defaultProps = {}

class Header extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 50, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">
              <FormattedMessage id="app.header.homeLink" />
            </NavLink>
          </NavItem>
        </Nav>
        <EnhachedNotification />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={userIcon} className="img-avatar" alt="" /> {this.props.user && this.props.user.email}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>
                  <FormattedMessage id="app.header.dropdown.accountHeader" />Account
                </strong>
              </DropdownItem>
              <DropdownItem>
                <a href="/#/account">
                  <i className="fa fa-user" /> <FormattedMessage id="app.header.dropdown.profileLink" />
                </a>
              </DropdownItem>
              <DropdownItem>
                <SignOutButton />
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    )
  }
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header

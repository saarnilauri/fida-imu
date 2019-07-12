import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import SignOutButton from '../SignOut'
import * as routes from '../../constants/routes'

const NavElement = ({ link, label, icon }) => (
  <NavItem>
    <NavLink href={link}>
      {icon && <FontAwesome name={icon} />}
      &nbsp;
      {label}
    </NavLink>
  </NavItem>
)

NavElement.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
}

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

const NavigationAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavElement link={routes.LANDING} label="Landing" />
    <NavElement link={routes.HOME} label="Home" />
    <NavElement link={routes.ACCOUNT} label="Account" icon="user-circle" />
    <NavItem>
      <SignOutButton />
    </NavItem>
  </Nav>
)

Navigation.propTypes = {
  authUser: PropTypes.object,
}

const NavigationNonAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavElement link={routes.LANDING} label="Landing" />
    <NavElement link={routes.SIGN_IN} label="Sign In" icon="user-circle" />
  </Nav>
)

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navigation)

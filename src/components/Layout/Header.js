import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";

import logo from "../../assets/img/brand/fida_logo.svg";
import EnhachedNotification from "../Notifications";
import LanguageMenu from "../LanguageSwitch/Menu";
import UserHeaderMenu from "../User/HeaderMenu";

const propTypes = {
  children: PropTypes.node,
  user: PropTypes.object
};

const defaultProps = {};

class Header extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 50, alt: "CoreUI Logo" }}
          minimized={{ src: logo, width: 30, height: 30, alt: "CoreUI Logo" }}
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
          <LanguageMenu />
          <UserHeaderMenu user={this.props.user} />
        </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

import React, { Component } from 'react'
import { Navbar, Collapse, NavbarBrand, Nav, NavbarToggler } from 'reactstrap'
import logo from './fida_logo.svg'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  render() {
    return (
      <Navbar dark expand="md" color="primary" className="navbar-ontop">
        <div className="container">
          <NavbarBrand href="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt=""
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="text-center justify-content-end"
          >
            <Nav className="ml-auto" navbar>
              <a
                className="btn navbar-btn text-white mx-2 btn-secondary"
                href="login.html"
              >
                Login
              </a>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

export default Header

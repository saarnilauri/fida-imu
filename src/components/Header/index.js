import React, { Component } from 'react'
import { Navbar, Collapse, NavbarBrand, NavbarToggler } from 'reactstrap'
import Navigation from '../Navigation'
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
            <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar className="text-center justify-content-end">
            <Navigation />
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

export default Header

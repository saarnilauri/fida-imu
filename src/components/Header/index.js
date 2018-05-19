import React, { Component } from 'react'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
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
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'Fida Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'Fida Logo' }}
        />
      </React.Fragment>
    )
  }
}

export default Header

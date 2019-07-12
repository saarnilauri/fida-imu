import React from 'react'
import ReactDOM from 'react-dom'
import FormElement from './index'
import {
  UsernameField,
  EmailField,
  PasswordField,
  PasswordConfirmField,
} from './FormFields'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FormElement />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('UsernameField renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<UsernameField />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('EmailField renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EmailField />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('PasswordField renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PasswordField />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('PasswordConfirmField renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PasswordConfirmField />, div)
  ReactDOM.unmountComponentAtNode(div)
})

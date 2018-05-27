import React from 'react'
import ReactDOM from 'react-dom'
import PasswordForgetPage, { PasswordForgetForm } from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PasswordForgetPage />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PasswordForgetForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})

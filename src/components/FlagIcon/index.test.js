import React from 'react'
import ReactDOM from 'react-dom'
import FlagIcon from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FlagIcon code="fi" />, div)
  ReactDOM.unmountComponentAtNode(div)
})

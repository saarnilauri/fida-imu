import React from 'react'
import ReactDOM from 'react-dom'
import CenteredLoader from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CenteredLoader />, div)
  ReactDOM.unmountComponentAtNode(div)
})

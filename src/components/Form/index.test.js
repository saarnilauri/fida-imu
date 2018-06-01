import React from 'react'
import ReactDOM from 'react-dom'
import Form from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Form onSubmit={() => {}} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

import React from 'react'
import ReactDOM from 'react-dom'
import ModalWrapper from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ModalWrapper />, div)
  ReactDOM.unmountComponentAtNode(div)
})

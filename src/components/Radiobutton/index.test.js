import React from 'react'
import ReactDOM from 'react-dom'
import Radiobutton from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Radiobutton name="radio" label="label-test" onChange={() => {}} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

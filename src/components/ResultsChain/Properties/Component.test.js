import React from 'react'
import ReactDOM from 'react-dom'
import Components from './Components'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Components onChangeComponent={() => {}} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

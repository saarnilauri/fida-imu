import React from 'react'
import ReactDOM from 'react-dom'
import EditAndRemove from './EditAndRemove'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <EditAndRemove onClickEdit={() => {}} onClickRemove={() => {}} />,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})

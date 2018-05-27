import React from 'react'
import ReactDOM from 'react-dom'
import { UserList } from '../List'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<UserList loadUsers={() => {}} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

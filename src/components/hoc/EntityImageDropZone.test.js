import React from 'react'
import ReactDOM from 'react-dom'
import EntityImageDropZone from './EntityImageDropZone'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EntityImageDropZone handleDrop={() => {}} handleDropRejected={() => {}} multiple />, div)
  ReactDOM.unmountComponentAtNode(div)
})

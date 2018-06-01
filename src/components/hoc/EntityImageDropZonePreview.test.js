import React from 'react'
import ReactDOM from 'react-dom'
import EntityImageDropZonePreview from './EntityImageDropZonePreview'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EntityImageDropZonePreview uploadedFiles={{}} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

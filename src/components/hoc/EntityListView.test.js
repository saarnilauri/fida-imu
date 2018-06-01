import React from 'react'
import ReactDOM from 'react-dom'
import EntityListView from './EntityListView'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <EntityListView
      data={[]}
      tableColumns={[]}
      tableSort={[]}
      entity="test"
      formatMessage={() => {}}
      removeEntity={() => {}}
      cancelRemove={() => {}}
      onSubmit={() => {}}
    />,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})

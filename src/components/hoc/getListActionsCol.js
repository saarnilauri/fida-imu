import React from 'react'
import EditAndRemove from '../ButtonGroup/EditAndRemove'

const getListActionsColumn = settings => ({
  Header: settings.formatMessage({ id: 'country.list.table.header.actions' }),
  id: 'edit',
  width: 100,
  accessor: d => (
    <EditAndRemove
      editTitleAttr={settings.formatMessage({ id: 'actions.edit' })}
      removeTitleAttr={settings.formatMessage({ id: 'actions.remove' })}
      onClickEdit={() => settings.edit(d.uid)} // eslint-disable-line
      onClickRemove={() => settings.promptRemove(d.uid)}
    />
  ),
})

export default getListActionsColumn

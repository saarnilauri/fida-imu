import getEntityAdminPage from '../../hoc/getEntityAdminPage'

const settings = {
  initialState: {
    name: '',
  },
  cleanState: {
    name: '',
  },
  form: {
    fields: {
      name: {
        icon: 'cube',
      },
    },
  },
  list: {
    settings: {
      tableColumns: ['name'],
      tableSort: [{ id: 'name' }],
    },
  },
}

const ComponentAdminPage = getEntityAdminPage('component', settings)

export default ComponentAdminPage

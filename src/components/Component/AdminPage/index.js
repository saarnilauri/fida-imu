import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import { text } from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: text('Name'),
  },
}

const uiSchema = {}

const settings = {
  form: {
    schema,
    uiSchema,
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

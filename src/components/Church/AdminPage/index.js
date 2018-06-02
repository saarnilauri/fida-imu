import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import { text } from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: text('Name'),
    city: text('City'),
    area: text('Area'),
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
      tableColumns: ['name', 'city', 'area'],
      tableSort: [{ id: 'name' }],
    },
  },
}

const ChurchAdminPage = getEntityAdminPage('church', settings)

export default ChurchAdminPage

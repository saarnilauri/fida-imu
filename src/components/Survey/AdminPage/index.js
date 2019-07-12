import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import { text } from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: text('Name'),
    description: text('Description'),
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

const SurveyAdminPage = getEntityAdminPage('survey', settings)

export default SurveyAdminPage

import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import { text, textareaSchema } from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: text('Topic'),
    text: text('Text'),
  },
}

const uiSchema = {
  text: textareaSchema(),
}

const settings = {
  form: {
    schema,
    uiSchema,
  },
  list: {
    settings: {
      tableColumns: ['name', 'text'],
      tableSort: [{ id: 'name' }],
    },
  },
}

const PrayerAdminPage = getEntityAdminPage('prayer', settings)

export default PrayerAdminPage

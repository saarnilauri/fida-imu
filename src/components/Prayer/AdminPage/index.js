import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import {
  text,
  textareaSchema,
  bool,
  radioSchema,
} from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: text('Topic'),
    text: text('Text'),
    person: text('Person'),
    anonymous: bool('Display as anonymous prayer reques', ['yes', 'no']),
  },
}

const uiSchema = {
  text: textareaSchema(),
  anonymous: radioSchema(),
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

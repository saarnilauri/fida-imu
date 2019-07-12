import getEntityAdminPage from '../../hoc/getEntityAdminPage'
import {
  bool,
  checkbox,
  number,
  select,
  text,
  checkboxSchema,
  hiddenSchema,
  numberSchema,
  radioSchema,
  selectSchema,
  textareaSchema,
} from '../../hoc/schemaFunctions'

const schema = {
  type: 'object',
  required: ['name', 'type', 'component', 'column'],
  properties: {
    name: text('Name'),
    description: text('Description'),
    goal: number('Goal value'),
    progress: Object.assign(text(), { default: '0' }),
    type: bool('Is this relative to other indicators?', ['goal', 'relative']),
    component: select('Component', [], []),
    column: checkbox(
      'Result chain column',
      ['ouput', 'outcome', 'impact'],
      ['Ouput', 'Outcome', 'Impact'],
    ),
  },
}

const uiSchema = {
  description: textareaSchema(),
  goal: numberSchema(),
  progress: hiddenSchema(),
  type: radioSchema(),
  component: selectSchema(),
  column: checkboxSchema(),
}

const settings = {
  form: {
    schema,
    uiSchema,
    sources: { component: 'component' },
  },
  list: {
    settings: {
      tableColumns: ['name', 'progress', 'goal'],
      tableSort: [{ id: 'name' }],
    },
  },
}

const IndicatorAdminPage = getEntityAdminPage('indicator', settings)

export default IndicatorAdminPage

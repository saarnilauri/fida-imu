import getEntityAdminPage from '../../hoc/getEntityAdminPage'

const initialState = {
  name: '',
  type: '',
  component: '',
  column: '',
}

const fields = {
  name: {
    icon: 'info',
  },
  type: {
    icon: 'dashboard',
    type: 'radio',
    values: ['basic', 'relative'],
  },
  component: {
    icon: 'cube',
    type: 'radio',
    source: 'component',
  },
  column: {
    icon: 'columns',
    type: 'checkbox',
    values: ['activity', 'output', 'outcome', 'impact'],
  },
}

const settings = {
  initialState,
  cleanState: initialState,
  form: {
    fields,
  },
  list: {
    settings: {
      tableColumns: Object.keys(initialState),
      tableSort: [{ id: 'name' }],
    },
  },
}

const IndicatorAdminPage = getEntityAdminPage('indicator', settings)

export default IndicatorAdminPage

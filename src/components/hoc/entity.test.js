import getEntityAdminPage from './getEntityAdminPage'
import getEntityForm from './getEntityForm'
import getEntityList from './getEntityList'

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
        icon: 'info',
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

describe('get entity wrapper functions', () => {
  it('getEntityAdminPage should return a component', () => {
    expect(getEntityAdminPage('test', settings)).toEqual(expect.any(Function))
  })
  it('getEntityForm should return a function', () => {
    expect(getEntityForm('test', settings)).toEqual(expect.any(Function))
  })
  it('should return a function', () => {
    expect(getEntityList('test', settings)).toEqual(expect.any(Function))
  })
})

import getEntityAdminPage from './getEntityAdminPage'
import getEntityForm from './getEntityForm'
import getEntityList from './getEntityList'
import { getAddEditCancelButtonSetup, getErrorProperty } from './helperFunctions'

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

const buttonData = {
  title: { add: 'add', save: 'save', cancel: 'cancel' },
  editMode: true,
  cancelEdit: () => {},
}

describe('helper functions', () => {
  it('getAddEditCancelButtonSetup should return an array', () => {
    const buttons = getAddEditCancelButtonSetup(buttonData)
    expect(buttons).toEqual(expect.any(Array))
    expect(buttons.length).toEqual(2)
    expect(buttons[0]).toEqual(expect.any(Object))
    expect(buttons[1]).toEqual(expect.any(Object))

    expect(buttons[0].title).toBe('save')
    expect(buttons[1].title).toBe('cancel')
  })

  it('getAddEditCancelButtonSetup should return an array', () => {
    buttonData.editMode = false
    const buttons = getAddEditCancelButtonSetup(buttonData)
    expect(buttons).toEqual(expect.any(Array))
    expect(buttons[0].title).toBe('add')
    expect(buttons.length).toEqual(1)
  })

  it('getErrorProperty error message in correct form', () => {
    expect(getErrorProperty('error')).toBe('error')
    expect(getErrorProperty({ message: 'error' })).toBe('error')
    expect(getErrorProperty(null)).toBe(null)
  })
})

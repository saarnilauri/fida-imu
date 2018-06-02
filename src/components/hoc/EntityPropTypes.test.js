import { EntityFormPropTypes, getEntityListPropTypes } from './EntityPropTypes'
import { getWordForms } from '../../constants/utils'

describe('get entity wrapper functions', () => {
  it('getEntityAdminPage should return a component', () => {
    expect(EntityFormPropTypes).toEqual(expect.any(Object))
  })
  it('getEntityForm should return a function', () => {
    expect(getEntityListPropTypes(getWordForms('test'))).toEqual(expect.any(Object))
  })
})

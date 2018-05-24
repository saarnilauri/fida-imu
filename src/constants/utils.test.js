import { updateByPropertyName, findUserItems } from './utils'

describe('Util functions', () => {
  it('updateByPropertyName returns function', () => {
    expect(updateByPropertyName('testKey', 'testValue')).toEqual(expect.any(Function))
  })

  it('updateByPropertyName curried function returns valid object', () => {
    expect(updateByPropertyName('testKey', 'testValue')()).toEqual({
      testKey: 'testValue',
    })
  })

  it('findUserItems returns array of objects', () => {
    const mockCollection = {
      'item-1': {
        users: ['test-user-key'],
      },
      'item-2': {
        users: ['test-user-key'],
      },
      'item-3': {
        users: ['test-user-key', 'test-user-2-key'],
      },
      'item-4': {
        users: ['test-user-2-key'],
      },
    }

    expect(findUserItems(mockCollection, 'test-user-key')).toEqual(expect.any(Array))
  })
})

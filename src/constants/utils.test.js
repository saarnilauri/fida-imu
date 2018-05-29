import {
  updateByPropertyName,
  findUserItems,
  collectionToArray,
  getWordForms,
  collectionToArrayWithLabelAndValue,
} from './utils'

const mockCollection = {
  'item-1': {
    name: 'item1name',
    users: ['test-user-key'],
  },
  'item-2': {
    name: 'item2name',
    users: ['test-user-key'],
  },
  'item-3': {
    name: 'item4name',
    users: ['test-user-key', 'test-user-2-key'],
  },
  'item-4': {
    name: 'item4name',
    users: ['test-user-2-key'],
  },
}

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
    expect(findUserItems(mockCollection, 'test-user-key')).toEqual(expect.any(Array))
  })

  it('collectionToArray returns array of objects', () => {
    expect(collectionToArray(mockCollection)).toEqual(expect.any(Array))
  })

  it('collectionToArrayWithLabelAndValue returns array of objects', () => {
    const results = collectionToArrayWithLabelAndValue(mockCollection, 'name')
    expect(results).toEqual(expect.any(Array))
    expect(results[0].label).toBe('item1name')
    expect(results[0].value).toBe('item-1')
    expect(results[0].key).toBe('item-1')
  })

  it('getWordForms returns valid word forms', () => {
    expect(getWordForms('resultschain')).toEqual({
      normal: 'resultschain',
      prular: 'resultschains',
      capitalized: 'Resultschain',
      capitalizedPrular: 'Resultschains',
      allCaps: 'RESULTSCHAIN',
      allCapsPrular: 'RESULTSCHAINS',
    })
    expect(getWordForms('country')).toEqual({
      normal: 'country',
      prular: 'countries',
      capitalized: 'Country',
      capitalizedPrular: 'Countries',
      allCaps: 'COUNTRY',
      allCapsPrular: 'COUNTRIES',
    })
    expect(getWordForms('person')).toEqual({
      normal: 'person',
      prular: 'people',
      capitalized: 'Person',
      capitalizedPrular: 'People',
      allCaps: 'PERSON',
      allCapsPrular: 'PEOPLE',
    })
    expect(getWordForms('man')).toEqual({
      normal: 'man',
      prular: 'men',
      capitalized: 'Man',
      capitalizedPrular: 'Men',
      allCaps: 'MAN',
      allCapsPrular: 'MEN',
    })
  })
})

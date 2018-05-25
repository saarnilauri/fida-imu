import { getWordForms, getInitialState, curriedAddEntity } from './curriedFirebase'

describe('curriedFirebase', () => {
  it('getWordForms returns valid word forms', () => {
    expect(getWordForms('resultschain')).toEqual({
      normal: 'resultschain',
      prular: 'resultschains',
      allCaps: 'RESULTSCHAIN',
      allCapsPrular: 'RESULTSCHAINS',
    })
    expect(getWordForms('country')).toEqual({
      normal: 'country',
      prular: 'countries',
      allCaps: 'COUNTRY',
      allCapsPrular: 'COUNTRIES',
    })
    expect(getWordForms('person')).toEqual({
      normal: 'person',
      prular: 'people',
      allCaps: 'PERSON',
      allCapsPrular: 'PEOPLE',
    })
    expect(getWordForms('man')).toEqual({
      normal: 'man',
      prular: 'men',
      allCaps: 'MAN',
      allCapsPrular: 'MEN',
    })
  })

  it('getInitialState returns valid state object', () => {
    expect(getInitialState('resultschain')).toEqual({
      collectionReady: false,
      resultschain: null,
      resultschainsCollection: [],
    })

    expect(getInitialState('country')).toEqual({
      collectionReady: false,
      country: null,
      countriesCollection: [],
    })
  })

  it('curriedAddEntity returns valid action creator', () => {
    expect(curriedAddEntity('resultschain')).toEqual(expect.any(Function))
  })
})

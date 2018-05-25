import configureStore from 'redux-mock-store'
import firebasemock from 'firebase-mock'
import thunk from 'redux-thunk'
import {
  getWordForms,
  getInitialState,
  getAddEntityActionCreator,
  getAddEntitiesActionCreator,
  getEntityCollectionNotReadyActionCreator,
  getEntityCollectionIsReadyActionCreator,
} from './curriedFirebase'

const getFirebase = () => new firebasemock.MockFirebase()

const middlewares = [thunk.withExtraArgument(getFirebase)]
const mockStore = configureStore(middlewares)

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

  it('getAddEntityActionCreator returns valid action creator', () => {
    const addResultschain = getAddEntityActionCreator('resultschain')
    expect(addResultschain).toEqual(expect.any(Function))

    expect(addResultschain({ title: 'test' })).toEqual({
      type: 'ADD_RESULTSCHAIN',
      payload: { title: 'test' },
    })
  })

  it('getAddEntitiesActionCreator returns valid action creator', () => {
    const addResultschains = getAddEntitiesActionCreator('resultschain')
    expect(addResultschains).toEqual(expect.any(Function))

    expect(addResultschains([{ title: 'test' }, { title: 'test-2' }])).toEqual({
      type: 'ADD_RESULTSCHAINS',
      payload: [{ title: 'test' }, { title: 'test-2' }],
    })
  })

  it('getEntityCollectionNotReadyActionCreator returns valid action creator', () => {
    const setResultchainsCollectionNotReady = getEntityCollectionNotReadyActionCreator('resultschain')
    expect(setResultchainsCollectionNotReady).toEqual(expect.any(Function))

    expect(setResultchainsCollectionNotReady()).toEqual({
      type: 'RESULTSCHAINS_COLLECTION_NOT_READY',
    })
  })

  it('getEntityCollectionIsReadyActionCreator returns valid action creator', () => {
    const setResultchainsCollectionIsReady = getEntityCollectionIsReadyActionCreator('resultschain')
    expect(setResultchainsCollectionIsReady).toEqual(expect.any(Function))

    expect(setResultchainsCollectionIsReady()).toEqual({
      type: 'RESULTSCHAINS_COLLECTION_IS_READY',
    })
  })

  it('should dispatch action', () => {
    // Initialize mockstore with empty state
    const initialState = getInitialState('resultschain')
    const store = mockStore(initialState)

    const setResultchainsCollectionIsReady = getEntityCollectionIsReadyActionCreator('resultschain')

    // Dispatch the action
    store.dispatch(setResultchainsCollectionIsReady())

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'RESULTSCHAINS_COLLECTION_IS_READY' }
    expect(actions).toEqual([expectedPayload])
    console.log(store.getState())
  })
})

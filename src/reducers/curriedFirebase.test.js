import configureStore from 'redux-mock-store'
import firebasemock from 'firebase-mock'
import thunk from 'redux-thunk'
import {
  applyReady,
  getApplyEntityToState,
  getApplyEntityCollectionToState,
  getWordForms,
  getInitialState,
  getAddEntityActionCreator,
  getAddEntitiesActionCreator,
  getEntityCollectionNotReadyActionCreator,
  getEntityCollectionIsReadyActionCreator,
  getLoadOneEntityActionCreator,
} from './curriedFirebase'

const firebaseMock = new firebasemock.MockFirebase()

firebaseMock.ref = () => {
  return new firebasemock.MockFirebase()
}

const getFirebase = () => firebaseMock
// firebasemock.override()
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
  })

  it('No error when dispatch load action', () => {
    // Initialize mockstore with empty state
    const initialState = getInitialState('resultschain')
    const store = mockStore(initialState)

    const loadOneEntity = getLoadOneEntityActionCreator('resultschain')

    // Dispatch the action
    expect(store.dispatch).not.toThrow(new Error())

    store.dispatch(loadOneEntity('test-uid'))
  })

  it('applyReady return a new valid state', () => {
    expect(applyReady(getInitialState('test'), { payload: true })).toEqual({
      collectionReady: true,
      test: null,
      testsCollection: [],
    })
    expect(applyReady({}, { payload: false })).toEqual({ collectionReady: false })
  })

  it('getApplyEntityToState return a new valid state', () => {
    expect(getApplyEntityToState('test')(getInitialState('test'), { payload: { title: 'test' } })).toEqual({
      collectionReady: false,
      test: { title: 'test' },
      testsCollection: [],
    })
  })

  it('getApplyEntityCollectionToState return a new valid state', () => {
    expect(
      getApplyEntityCollectionToState('test')(getInitialState('test'), {
        payload: [{ title: 'test' }, { title: 'test2' }],
      }),
    ).toEqual({
      collectionReady: false,
      test: null,
      testsCollection: [{ title: 'test' }, { title: 'test2' }],
    })
  })
})

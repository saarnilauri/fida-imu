import pluralize from 'pluralize'
import _ from 'lodash'
import { sendNotification } from './notifications'

export function getWordForms(word) {
  return {
    normal: word,
    prular: pluralize(word),
    allCaps: _.upperCase(word),
    allCapsPrular: _.upperCase(pluralize(word)),
  }
}

const withWordForms = (entity, wrappedFunction) => {
  const wordForms = getWordForms(entityName)
  return wrappedFunction(wordForms)
}

export function getInitialState(entityName) {
  const wordForms = getWordForms(entityName)
  const INITIAL_STATE = { collectionReady: false }
  INITIAL_STATE[entityName] = null
  INITIAL_STATE[`${wordForms.prular}Collection`] = []
  return INITIAL_STATE
}

export const getAddEntityActionCreator = entity => payload => {
  const wordForms = getWordForms(entity)
  return {
    type: `ADD_${wordForms.allCaps}`,
    payload,
  }
}

export const getAddEntitiesActionCreator = entity => payload => {
  const wordForms = getWordForms(entity)
  return {
    type: `ADD_${wordForms.allCapsPrular}`,
    payload,
  }
}

export const getEntityCollectionNotReadyActionCreator = entity => () => {
  const wordForms = getWordForms(entity)
  return {
    type: `${wordForms.allCapsPrular}_COLLECTION_NOT_READY`,
  }
}

export const getEntityCollectionIsReadyActionCreator = entity => () => {
  const wordForms = getWordForms(entity)
  return {
    type: `${wordForms.allCapsPrular}_COLLECTION_IS_READY`,
  }
}

export const getLoadOneEntityActionCreator = entity => uid => (dispatch, getState, getFirebase) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  firebase
    .ref(`${wordForms.prular}/${uid}`)
    .once('value')
    .then(snap => {
      dispatch(getAddEntityActionCreator(entity)(snap.val()))
      dispatch(sendNotification('Result chain loaded...'))
    })
}

export const getLoadEntityCollectionActionCreator = entity => (message = `${entity} loaded...`) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  dispatch(getEntityCollectionNotReadyActionCreator(entity))
  const firebase = getFirebase()
  firebase
    .ref(wordForms.prular)
    .once('value')
    .then(snap => {
      dispatch(getAddEntitiesActionCreator(entity)(snap.val()))
      dispatch(getEntityCollectionIsReadyActionCreator(entity))
      dispatch(sendNotification(message))
    })
}

export const getAddEntityToFirebaseActionCreator = entity => newEntity => (dispatch, getState, getFirebase) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  firebase.push(wordForms.prular, newEntity).then(snap => {
    dispatch(getAddEntityActionCreator(entity)({ ...newEntity, uid: snap.key }))
    dispatch(getLoadEntityCollectionActionCreator(entity)(`${entity} updated...`))
  })
}

export const getUpdateEntityToFirebaseActionCreator = entity => (uid, updatedEntity) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase()
  firebase.set(`resultschains/${uid}`, updatedEntity).then(() => {
    dispatch(getAddEntityActionCreator(entity)({ ...updatedEntity, uid: snap.key }))
    dispatch(getLoadEntityCollectionActionCreator(entity)(`${entity} updated...`))
  })
}

export const getApplyEntityToState = entity => (state, action) => {
  const newState = {
    ...state,
  }
  newState[entity] = action.payload
  return newState
}

export const getApplyEntityCollectionToState = entity => (state, action) => {
  const wordForms = getWordForms(entity)
  const newState = {
    ...state,
  }
  newState[`${wordForms.prular}Collection`] = action.payload
  return newState
}

export const applyReady = (state, action) => ({
  ...state,
  collectionReady: action.payload,
})

const getEntityReducer = entity => (state = getInitialState(entity), action) => {
  const wordForms = getWordForms(entity)
  switch (action.type) {
  case `ADD_${wordForms.allCaps}`: {
    return getApplyEntityToState(entity)(state, action)
  }
  case `ADD_${wordForms.allCapsPrular}`: {
    return getApplyEntityCollectionToState(entity)(state, action)
  }
  case `${wordForms.allCapsPrular}_COLLECTION_NOT_READY`: {
    return applyReady(state, { payload: false })
  }
  case `${wordForms.allCapsPrular}_COLLECTION_IS_READY`: {
    return applyReady(state, { payload: true })
  }
  default:
    return state
  }
}

export default getEntityReducer

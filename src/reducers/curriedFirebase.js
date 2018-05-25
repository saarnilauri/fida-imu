import pluralize from 'pluralize'
import _ from 'lodash'
// import { sendNotification } from './notifications'

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
      dispatch(addResultsChain(snap.val()))
      dispatch(sendNotification('Result chain loaded...'))
    })
}

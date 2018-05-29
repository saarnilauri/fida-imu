import { sendNotification } from './notifications'
import { getWordForms } from '../constants/utils'

export function getInitialState(entity) {
  const wordForms = getWordForms(entity)
  const INITIAL_STATE = { collectionReady: false }
  INITIAL_STATE[entity] = null
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

export const getLoadOneEntityActionCreator = entity => (uid, message, addToStore = true) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  const prom = new Promise((resolve, reject) => {
    firebase
      .ref(`${wordForms.prular}/${uid}`)
      .once('value')
      .then(snap => {
        if (addToStore) {
          dispatch(getAddEntityActionCreator(entity)(snap.val()))
        }
        dispatch(sendNotification(message))
        resolve({ ...snap.val(), uid: snap.key })
      })
      .catch(error => reject(error))
  })
  return prom
}

export const getLoadEntityCollectionActionCreator = entity => (message = `${entity} loaded...`) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  const notReady = getEntityCollectionNotReadyActionCreator(entity)
  dispatch(notReady())
  const firebase = getFirebase()
  firebase
    .ref(wordForms.prular)
    .once('value')
    .then(snap => {
      const addEntities = getAddEntitiesActionCreator(entity)
      const isReady = getEntityCollectionIsReadyActionCreator(entity)
      dispatch(addEntities(snap.val()))
      dispatch(isReady())
      dispatch(sendNotification(message))
    })
}

export const getAddEntityToFirebaseActionCreator = entity => (newEntity, message) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  firebase.push(wordForms.prular, newEntity).then(snap => {
    dispatch(getAddEntityActionCreator(entity)({ ...newEntity, uid: snap.key }))
    dispatch(getLoadEntityCollectionActionCreator(entity)(message))
  })
}

export const getUpdateEntityToFirebaseActionCreator = entity => (uid, updatedEntity, message) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  firebase.set(`${wordForms.prular}/${uid}`, updatedEntity).then(() => {
    if (entity === 'user') {
      firebase.set(`userProfiles/${uid}`, updatedEntity).then(() => {})
    }
    dispatch(getLoadEntityCollectionActionCreator(entity)(message))
  })
}

export const getRemoveEntityFromFirebaseActionCreator = entity => (uid, message) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const wordForms = getWordForms(entity)
  const firebase = getFirebase()
  firebase
    .ref(wordForms.prular)
    .child(uid)
    .remove()
    .then(() => {
      dispatch(getLoadEntityCollectionActionCreator(entity)(message))
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

export const getMapDispatchToProps = entity => dispatch => {
  const addEntity = getAddEntityToFirebaseActionCreator(entity)
  const loadEntity = getLoadOneEntityActionCreator(entity)
  const loadEntities = getLoadEntityCollectionActionCreator(entity)
  const removeEntity = getRemoveEntityFromFirebaseActionCreator(entity)
  const updateEntity = getUpdateEntityToFirebaseActionCreator(entity)
  const wordForms = getWordForms(entity)

  const map = {}
  map[`add${wordForms.capitalized}`] = item => dispatch(addEntity(item, `${wordForms.capitalizedPrular} added...`))
  map[`update${wordForms.capitalized}`] = (uid, item) =>
    dispatch(updateEntity(uid, item, `${wordForms.capitalized} updated...`))
  map[`remove${wordForms.capitalized}`] = uid => dispatch(removeEntity(uid, `${wordForms.capitalized} removed...`))
  map[`load${wordForms.capitalizedPrular}`] = () => dispatch(loadEntities(`${wordForms.capitalizedPrular} loaded...`))
  map[`load${wordForms.capitalized}`] = (uid, addToStore) =>
    dispatch(loadEntity(uid, `${wordForms.capitalized} loaded...`, addToStore))
  return map
}

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

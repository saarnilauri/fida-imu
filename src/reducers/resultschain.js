import { sendNotification } from './notifications'

const INITIAL_STATE = {
  resultsChain: null,
  resultsChainCollection: null,
  collectionReady: false,
}
export const addResultsChain = payload => ({
  type: 'ADD_RESULTS_CHAIN',
  payload,
})

export const addResultsChains = payload => ({
  type: 'ADD_RESULTS_CHAINS',
  payload,
})

export const setNotReady = () => ({
  type: 'NOT_READY',
})
export const setReady = () => ({
  type: 'READY',
})

export const loadOneResultsChain = uid => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  firebase
    .ref(`resultschains/${uid}`)
    .once('value')
    .then(snap => {
      dispatch(addResultsChain(snap.val()))
      dispatch(sendNotification('Result chain loaded...'))
    })
}

export const loadResultsChains = (message = 'Result chains loaded...') => (dispatch, getState, getFirebase) => {
  dispatch(setNotReady())
  const firebase = getFirebase()
  firebase
    .ref('resultschains')
    .once('value')
    .then(snap => {
      dispatch(addResultsChains(snap.val()))
      dispatch(setReady())
      dispatch(sendNotification(message))
    })
}

export const addResultsChainToFirebase = newResultsChain => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  firebase.push('resultschains', newResultsChain).then(snap => {
    // console.log(snap)
    dispatch(addResultsChain({ ...newResultsChain, uid: snap.key }))
    dispatch(loadResultsChains('Result chain updated...'))
  })
}

export const updateResultsChainToFirebase = (uid, resultsChain) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  firebase.set(`resultschains/${uid}`, resultsChain).then(() => {
    // console.log(snap)
    dispatch(addResultsChain({ ...resultsChain, uid }))
    dispatch(loadResultsChains('Result chain updated...'))
  })
}

export const applySetPayload = (state, action) => ({
  ...state,
  resultsChain: action.payload,
})

export const applySetList = (state, action) => ({
  ...state,
  resultsChainCollection: action.payload,
})

export const applyReady = (state, action) => ({
  ...state,
  collectionReady: action.payload,
})

const resultsChainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_RESULTS_CHAIN': {
    return applySetPayload(state, action)
  }
  case 'ADD_RESULTS_CHAINS': {
    return applySetList(state, action)
  }
  case 'NOT_READY': {
    return applyReady(state, { payload: false })
  }
  case 'READY': {
    return applyReady(state, { payload: true })
  }
  default:
    return state
  }
}

export default resultsChainReducer

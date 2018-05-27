import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import sessionReducer from './session'
import resultsChainReducer from './resultschain'
import notificationReducer from './notifications'
import getEntityReducer from './curriedFirebase'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  sessionState: sessionReducer,
  userState: getEntityReducer('user'),
  notificationState: notificationReducer,
  resultsChainState: resultsChainReducer,
  countryState: getEntityReducer('country'),
})

export default rootReducer

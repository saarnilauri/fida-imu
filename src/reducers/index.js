import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import sessionReducer from './session'
import userLocale from './userLocale'
import resultsChainReducer from './resultschain'
import notificationReducer from './notifications'
import getEntityReducer from './curriedFirebase'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  sessionState: sessionReducer,
  userLocaleState: userLocale,
  userState: getEntityReducer('user'),
  notificationState: notificationReducer,
  resultsChainState: resultsChainReducer,
  countryState: getEntityReducer('country'),
  churchState: getEntityReducer('church'),
})

export default rootReducer

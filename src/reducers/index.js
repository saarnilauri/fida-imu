import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import sessionReducer from './session'
import resultsChainReducer from './resultschain'
import notificationReducer from './notifications'

import userReducer from './user'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  notificationState: notificationReducer,
  resultsChainState: resultsChainReducer,
})

export default rootReducer

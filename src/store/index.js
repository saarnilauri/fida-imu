import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
// import logger from 'redux-logger'
import { firebase } from '../firebase/firebase'
import rootReducer from '../reducers'

const rrfConfig = { userProfile: 'userProfiles' }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // options like actionSanitizer, stateSanitizer
  })
  : compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase, rrfConfig, { userProfile: 'usersProfiles', enableLogging: false }),
  ),
)

export default store

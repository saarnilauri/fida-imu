import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
// import logger from 'redux-logger'
import { firebase } from '../firebase/firebase'
import rootReducer from '../reducers'

const rrfConfig = { userProfile: 'userProfiles' }

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase, rrfConfig, { userProfile: 'usersProfiles', enableLogging: false }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

export default store

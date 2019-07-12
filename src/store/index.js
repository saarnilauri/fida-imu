import { applyMiddleware, compose, createStore } from 'redux'
import LogRocket from 'logrocket'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
// import logger from 'redux-logger'
import { firebase } from '../firebase/firebase'
import rootReducer from '../reducers'
import { setLocaleLanguage } from '../reducers/userLocale'

const rrfConfig = { userProfile: 'userProfiles' }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument(getFirebase),
      LogRocket.reduxMiddleware(),
    ),
    reactReduxFirebase(firebase, rrfConfig, {
      userProfile: 'usersProfiles',
      enableLogging: false,
    }),
  ),
)

if (localStorage) {
  const locale = localStorage.getItem('locale')
  if (locale) {
    store.dispatch(setLocaleLanguage(locale))
  }
}

export default store

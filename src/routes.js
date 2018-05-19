import React from 'react'
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>
}

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: Loading,
})

const LandingPage = Loadable({
  loader: () => import('./components/Landing'),
  loading: Loading,
})

const SignUpPage = Loadable({
  loader: () => import('./components/SignUp'),
  loading: Loading,
})

const SignInPage = Loadable({
  loader: () => import('./components/SignIn'),
  loading: Loading,
})

const AccountPage = Loadable({
  loader: () => import('./components/Account'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Landing', component: LandingPage },
  { path: '/home', name: 'Home', component: Home },
  { path: '/landing', name: 'Landing', component: LandingPage },
  { path: '/sign-up', name: 'Sign Up', component: SignUpPage },
  { path: '/sign-in', name: 'Sign in', component: SignInPage },
  { path: '/account', name: 'Account', component: AccountPage },
]

export default routes

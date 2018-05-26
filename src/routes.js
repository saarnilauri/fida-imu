import React from 'react'
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>
}

const Users = Loadable({
  loader: () => import('./components/Users'),
  loading: Loading,
})

const LandingPage = Loadable({
  loader: () => import('./components/Landing'),
  loading: Loading,
})

const AccountPage = Loadable({
  loader: () => import('./components/Account'),
  loading: Loading,
})

const ResultsChain = Loadable({
  loader: () => import('./components/ResultsChain/Container'),
  loading: Loading,
})

const CountryList = Loadable({
  loader: () => import('./components/Country/List'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Landing', component: LandingPage },
  { path: '/users', name: 'Home', component: Users },
  { path: '/landing', name: 'Landing', component: LandingPage },
  { path: '/account', name: 'Account', component: AccountPage },
  { path: '/results-chain', name: 'Results chain', component: ResultsChain },
  { path: '/countries', name: 'Countries', component: CountryList },
]

export default routes

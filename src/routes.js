import Loadable from 'react-loadable'
import Loading from './components/CenteredLoader'
import { activeProfileCondition, authCondition, adminRoleCondition } from './components/Session/utils'
import withAuthorization from './components/Session/withAuthorization'

const Users = Loadable({
  loader: () => import('./components/User/AdminPage'),
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

const IndicatorAdminPage = Loadable({
  loader: () => import('./components/Indicator/AdminPage'),
  loading: Loading,
})

const CountryList = Loadable({
  loader: () => import('./components/Country/List/Page'),
  loading: Loading,
})

const ChurchAdminPage = Loadable({
  loader: () => import('./components/Church/AdminPage'),
  loading: Loading,
})

const ComponentAdminPage = Loadable({
  loader: () => import('./components/Component/AdminPage'),
  loading: Loading,
})
const PrayerAdminPage = Loadable({
  loader: () => import('./components/Prayer/AdminPage'),
  loading: Loading,
})

const NotAllowed = Loadable({
  loader: () => import('./components/NotAllowed'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Landing', component: LandingPage },
  { path: '/users', name: 'Home', component: withAuthorization(authCondition, adminRoleCondition)(Users) },
  { path: '/landing', name: 'Landing', component: LandingPage },
  {
    path: '/churches',
    name: 'Churches',
    component: withAuthorization(authCondition, adminRoleCondition)(ChurchAdminPage),
  },
  {
    path: '/indicatorbank',
    name: 'Indicator bank',
    component: withAuthorization(authCondition, adminRoleCondition)(IndicatorAdminPage),
  },
  {
    path: '/components',
    name: 'Components',
    component: withAuthorization(authCondition, adminRoleCondition)(ComponentAdminPage),
  },
  {
    path: '/prayers',
    name: 'Prayers',
    component: withAuthorization(authCondition)(PrayerAdminPage),
  },
  {
    path: '/account',
    name: 'Account',
    component: withAuthorization(authCondition, activeProfileCondition)(AccountPage),
  },
  {
    path: '/results-chain',
    name: 'Results chain',
    component: withAuthorization(authCondition, activeProfileCondition)(ResultsChain),
  },
  {
    path: '/countries',
    name: 'Countries',
    component: withAuthorization(authCondition, activeProfileCondition)(CountryList),
  },
  { path: '/notAllowed', name: 'Not allowd', component: NotAllowed },
]

export default routes

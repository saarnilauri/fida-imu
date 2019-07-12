import { lazy } from 'react'
import {
  activeProfileCondition,
  authCondition,
  adminRoleCondition,
} from './components/Session/utils'
import withAuthorization from './components/Session/withAuthorization'

const Users = lazy(() => import('./components/User/AdminPage'))
const LandingPage = lazy(() => import('./components/Landing'))
const AccountPage = lazy(() => import('./components/Account'))
const ResultsChain = lazy(() => import('./components/ResultsChain/Container'))
const IndicatorAdminPage = lazy(() =>
  import('./components/Indicator/AdminPage'),
)
const CountryList = lazy(() => import('./components/Country/List/Page'))
const ChurchAdminPage = lazy(() => import('./components/Church/AdminPage'))
const SurveyAdminPage = lazy(() => import('./components/Survey/AdminPage'))
const ComponentAdminPage = lazy(() =>
  import('./components/Component/AdminPage'),
)
const PrayerAdminPage = lazy(() => import('./components/Prayer/AdminPage'))
const NotAllowed = lazy(() => import('./components/NotAllowed'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Landing', component: LandingPage },
  {
    path: '/users',
    name: 'Home',
    component: withAuthorization(authCondition, adminRoleCondition)(Users),
  },
  { path: '/landing', name: 'Landing', component: LandingPage },
  {
    path: '/churches',
    name: 'Churches',
    component: withAuthorization(authCondition, adminRoleCondition)(
      ChurchAdminPage,
    ),
  },
  {
    path: '/indicatorbank',
    name: 'Indicator bank',
    component: withAuthorization(authCondition, adminRoleCondition)(
      IndicatorAdminPage,
    ),
  },
  {
    path: '/components',
    name: 'Components',
    component: withAuthorization(authCondition, adminRoleCondition)(
      ComponentAdminPage,
    ),
  },
  {
    path: '/prayers',
    name: 'Prayers',
    component: withAuthorization(authCondition)(PrayerAdminPage),
  },
  {
    path: '/account',
    name: 'Account',
    component: withAuthorization(authCondition, activeProfileCondition)(
      AccountPage,
    ),
  },
  {
    path: '/results-chain',
    name: 'Results chain',
    component: withAuthorization(authCondition, activeProfileCondition)(
      ResultsChain,
    ),
  },
  {
    path: '/countries',
    name: 'Countries',
    component: withAuthorization(authCondition, activeProfileCondition)(
      CountryList,
    ),
  },
  {
    path: '/surveys',
    name: 'Surveys',
    component: withAuthorization(authCondition, activeProfileCondition)(
      SurveyAdminPage,
    ),
  },
  { path: '/notAllowed', name: 'Not allowd', component: NotAllowed },
]

export default routes

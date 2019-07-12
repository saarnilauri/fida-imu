import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css'
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css'
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css'
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-day-picker/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import 'react-table/react-table.css'
// Import Main styles for this application
import './scss/style.css' // eslint-disable-line

import store from './store'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

WebFont.load({
  google: {
    families: ['Istok+Web:400,700', 'Montserrat:300,400,500,700,800'],
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()

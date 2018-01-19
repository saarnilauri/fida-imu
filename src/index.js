import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'
import store from './store'
import 'fida-bootstrap' // eslint-disable-line
import './index.css'
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

import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

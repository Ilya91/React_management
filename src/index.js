import React from 'react'
import { render } from 'react-dom'
import App from './components/App/index'
import store from './store'
import { Provider } from 'react-redux'
import { AUTH_USER } from './constants'

import jwt from 'jwt-simple'
import config from '../server/config.json'

let localToken = localStorage.getItem('token')
if (localToken) {
    let id = jwt.decode(localToken, config.secret).sub
    store.dispatch({ type: AUTH_USER, payload:{ id } })
}


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.wrapper')
)
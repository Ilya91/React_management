import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import logger from 'redux-logger'
import idGenerator from '../middlewares/idGenerator'
import api from '../middlewares/api'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk, /*logger,*/ idGenerator, api)
))

// only for dev
//window.store = store

export default store
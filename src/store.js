import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import asyncMiddleware from './asyncMiddleware'
import * as reducers from './reducers/'
import { persist, hydrate } from './reduxPresist'

const logger = createLogger({
  collapsed: true
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  keys: ['session']
}

const middlewares = [
  thunk, asyncMiddleware, promise, persist(persistConfig)
]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  combineReducers(reducers),
  hydrate(),
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import api from './middleware/api'
import token from './middleware/token'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(token, thunk, api))
)

export default configureStore

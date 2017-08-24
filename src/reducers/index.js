import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import paginate from './paginate'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { listings: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  listingsByEndpoint: paginate({
    mapActionToKey: action => action.endpoint,
    types: [
      ActionTypes.LISTINGS_REQUEST,
      ActionTypes.LISTINGS_SUCCESS,
      ActionTypes.LISTINGS_FAILURE
    ]
  }),
})

const rootReducer = combineReducers({
  auth,
  entities,
  form,
  pagination,
  errorMessage,
  routing
})

export default rootReducer

import axios from 'axios'
import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

const callApi = (endpoint, schema) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('No access token!')
  }

  const config = {
    baseURL: 'https://oauth.reddit.com',
    headers: { 'Authorization': `bearer ${accessToken}` },
    url: endpoint,
  }

  return axios(config)
    .then(response => {
      if (response.status < 200 || response.state >= 300) {
        return Promise.reject(response)
      }

      const { data } = response.data
      const camelizedJson = camelizeKeys(data)

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl: data.after ? `${endpoint}?count=25&after=${data.after}` : undefined },
        { previousPageUrl: data.before ? `${endpoint}?count=25&before=${data.before}` : undefined },
        { kind: response.data.kind },
      )
    })
    .catch(error => { throw error })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const listingSchema = new schema.Entity('listings', {}, {
  idAttribute: listing => listing.data.id
})

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
})

const repoSchema = new schema.Entity('repos', {
  owner: userSchema
}, {
  idAttribute: repo => repo.fullName.toLowerCase()
})

// Schemas for Reddit API responses.
export const Schemas = {
  LISTINGS: { children: [listingSchema] },
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema]
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    console.log(endpoint)
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType, endpoint }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response,
      endpoint,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
      endpoint,
    }))
  )
}

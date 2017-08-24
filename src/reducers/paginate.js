import union from 'lodash/union'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types

  const updatePagination = (state = {
    isFetching: false,
    nextPageUrl: undefined,
    previousPageUrl: undefined,
    kind: undefined,
    pageCount: 0,
    ids: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.response.result.children),
          nextPageUrl: action.response.nextPageUrl,
          previousPageUrl: action.response.previousPageUrl,
          kind: action.response.kind,
          pageCount: state.pageCount + 1,
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          console.log(action)
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}

export default paginate

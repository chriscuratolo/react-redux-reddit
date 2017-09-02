import { CALL_API, Schemas } from '../middleware/api'

// TODO: add count param
export const paramsToEndpoint = params => {
  let endpoint = ``
  if (params.subreddit) {
    endpoint += `/r/${params.subreddit}`
  }
  if (params.sorting) {
    endpoint += `/${params.sorting}`
  } else {
    endpoint += `/hot`
  }
  if (params.after) {
    endpoint += `?after=${params.after}`
  }
  return endpoint
}

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_SUCCESS = 'LISTINGS_SUCCESS'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

const fetchListings = endpoint => ({
  [CALL_API]: {
    types: [
      LISTINGS_REQUEST,
      LISTINGS_SUCCESS,
      LISTINGS_FAILURE,
    ],
    schema: Schemas.LISTINGS,
    endpoint,
  }
})

export const loadListings = params => (dispatch, getState) => {
  const endpoint = paramsToEndpoint(params)

  if (getState().pagination.listingsByEndpoint[endpoint]) {
    return null
  }

  return dispatch(fetchListings(endpoint))
}

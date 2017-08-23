import { CALL_API, Schemas } from '../middleware/api'

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_SUCCESS = 'LISTINGS_SUCCESS'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

const fetchListings = () => ({
  [CALL_API]: {
    types: [ LISTINGS_REQUEST, LISTINGS_SUCCESS, LISTINGS_FAILURE ],
    endpoint: 'subreddits/mine/subscriber',
    schema: Schemas.LISTINGS,
  }
})

export const loadListings = () => (dispatch, getState) => {
  return dispatch(fetchListings())
}

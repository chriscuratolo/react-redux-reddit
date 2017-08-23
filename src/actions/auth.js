import axios from 'axios'
import { camelizeKeys } from 'humps'

export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST'
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS'
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE'

export const fetchTokenRequest = () => ({ type: FETCH_TOKEN_REQUEST })
export const fetchTokenSuccess = payload => ({ type: FETCH_TOKEN_SUCCESS, payload })
export const fetchTokenFailure = error => ({ type: FETCH_TOKEN_FAILURE, error })

export const fetchToken = code => dispatch => {
  const url =
    `https://www.reddit.com/api/v1/access_token`
    + `?grant_type=authorization_code`
    + `&code=${code}`
    + `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`

  const config = {
    auth: {
      username: process.env.REACT_APP_CLIENT_ID,
      password: process.env.REACT_APP_SECRET,
    },
    method: 'POST',
    url,
  }

  dispatch(fetchTokenRequest())

  return axios(config)
    .then(response => dispatch(fetchTokenSuccess(camelizeKeys(response.data))))
    .catch(error => dispatch(fetchTokenFailure(error)))
}

export const REVOKE_TOKEN_REQUEST = 'REVOKE_TOKEN_REQUEST'
export const REVOKE_TOKEN_SUCCESS = 'REVOKE_TOKEN_SUCCESS'
export const REVOKE_TOKEN_FAILURE = 'REVOKE_TOKEN_FAILURE'

export const revokeTokenRequest = () => ({ type: REVOKE_TOKEN_REQUEST })
export const revokeTokenSuccess = () => ({ type: REVOKE_TOKEN_SUCCESS })
export const revokeTokenFailure = error => ({ type: REVOKE_TOKEN_FAILURE, error })

export const revokeToken = () => dispatch => {
  const url =
    `https://www.reddit.com/api/v1/revoke_token`
    + `?token=${localStorage.getItem('accessToken')}`
    + `&token_type_hint=access_token`

  const config = {
    auth: {
      username: process.env.REACT_APP_CLIENT_ID,
      password: process.env.REACT_APP_SECRET,
    },
    method: 'POST',
    url,
  }

  dispatch(revokeTokenRequest())

  return axios(config)
    .then(response => dispatch(revokeTokenSuccess()))
    .catch(error => dispatch(revokeTokenFailure(error)))
}

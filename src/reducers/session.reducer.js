import Api from './../Api'
import { SET_AUTH_TOKEN } from './../actions/setAuthToken.action'
import { LOGOUT } from './../actions/logout.action'
import { FETCH_CURRENT_USER } from './../actions/fetchCurrentUser.action'

const defaultState = {
  token: null,
  user: null
}

function sessionReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      Api.setAuthToken(action.payload.token)
      return {
        ...state,
        token: action.payload.token
      }
    case LOGOUT:
      return defaultState
    case FETCH_CURRENT_USER.FULFILLED:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default sessionReducer

import { LOGOUT } from './../actions/logout.action'
import { FETCH_CREDENTIALS } from '../actions/users/fetchCredentials.action'
import { SET_CREDENTIALS } from './../actions/setCredentials.action'

const defaultState = {
  formr: {
    fetching: false,
    accessToken: null,
    error: null
  },
  google: {
    fetching: false,
    accessToken: null,
    error: null
  }
}

function credentialsReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_CREDENTIALS.PENDING:
      return {
        ...state,
        [action.payload.provider]: {
          ...state[action.payload.provider],
          fetching: true
        }
      }
    case FETCH_CREDENTIALS.FULFILLED:
      return {
        ...state,
        [action.payload.provider]: {
          fetching: false,
          accessToken: action.payload.accessToken,
          error: null
        }
      }
    case FETCH_CREDENTIALS.REJECTED:
      return {
        ...state,
        [action.payload.provider]: {
          ...state[action.payload.provider],
          accessToken: null,
          fetching: false,
          error: action.payload
        }
      }
    case SET_CREDENTIALS.FULFILLED:
      return {
        ...state,
        [action.payload.provider]: {
          ...defaultState[action.payload.provider],
          accessToken: action.payload.accessToken
        }
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default credentialsReducer

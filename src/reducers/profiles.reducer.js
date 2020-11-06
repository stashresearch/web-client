import { LOGOUT } from './../actions/logout.action'
import { FETCH_PROFILE } from './../actions/fetchProfile.action'

const defaultState = {}

function profilesReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PROFILE.FULFILLED:
      return {
        ...state,
        [action.payload.name]: action.payload
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default profilesReducer

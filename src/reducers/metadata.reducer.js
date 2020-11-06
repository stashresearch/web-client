import { LOGOUT } from './../actions/logout.action'
import { FETCH_METADATA } from './../actions/projects/fetchMetadata.action'

const defaultState = {}

function metadataReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_METADATA.FULFILLED:
      return {
        ...state,
        [action.payload.uuid]: action.payload
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default metadataReducer

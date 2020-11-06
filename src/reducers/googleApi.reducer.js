import { LOGOUT } from './../actions/logout.action'
import { SET_GOOGLE_AUTH_TOKEN } from '../actions/setGoogleAuthToken.action'
import { FETCH_GOOGLE_ACCESS_TOKEN } from '../actions/fetchGoogleAccessToken.action'
import { SET_GOOGLE_API_LOADED } from './../actions/googleApi/setApiLoaded.action'
import { SET_GOOGLE_API_LOADING } from './../actions/googleApi/setApiLoading.action'
import { SET_GOOGLE_API_LOAD_ERROR } from './../actions/googleApi/setApiLoadError.action'

const defaultState = {
  loadingApi: false,
  apiLoaded: false,
  apiLoadError: null,
  accessToken: null,
  fetchingToken: false,
  tokenError: null
}

function googleApiReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_GOOGLE_AUTH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.token
      }
    case FETCH_GOOGLE_ACCESS_TOKEN.PENDING:
      return {
        ...state,
        fetchingToken: true
      }
    case FETCH_GOOGLE_ACCESS_TOKEN.FULFILLED:
      return {
        ...state,
        fetchingToken: false,
        accessToken: action.payload.googleAccessToken
      }
    case FETCH_GOOGLE_ACCESS_TOKEN.REJECTED:
      return {
        ...state,
        fetchingToken: false,
        // tokenError: action.payload // TODO check API for actual error format
        tokenError: 'Unable to connect to Google Drive'
      }
    case SET_GOOGLE_API_LOADING:
      return {
        ...state,
        loadingApi: action.payload.loading
      }
    case SET_GOOGLE_API_LOADED:
      return {
        ...state,
        loadingApi: false,
        apiLoaded: true
      }
    case SET_GOOGLE_API_LOAD_ERROR:
      return {
        ...state,
        loadingApi: false,
        apiLoadError: action.payload.error
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default googleApiReducer

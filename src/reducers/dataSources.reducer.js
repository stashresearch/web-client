import { LOGOUT } from './../actions/logout.action'
import { FETCH_DATA_SOURCES } from '../actions/projects/dataSources/fetchDataSources.action'
import { FETCH_DATA_SOURCE } from './../actions/projects/dataSources/fetchDataSource.action'
import { SETUP_DATA_SOURCE } from './../actions/projects/dataSources/setupDataSource.action'
import { PUT_DATA_SOURCE_DATA } from './../actions/projects/dataSources/putDataSourceData.action'
import { formState } from './../config/'
import { parseApiSuccess, parsePendingState, parseApiError } from './../lib/handleFormResponse'

const defaultState = {
  setupForm: {
    success: false,
    error: null
  },
  putFeedback: {}
}

function dataSourcesReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_DATA_SOURCES.FULFILLED:
      return {
        ...state,
        [action.payload.projectId]: action.payload.dataSources
      }
    case FETCH_DATA_SOURCE.FULFILLED:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case SETUP_DATA_SOURCE.PENDING:
      return {
        ...state,
        setupForm: defaultState.setupForm
      }
    case SETUP_DATA_SOURCE.FULFILLED:
      return {
        ...state,
        setupForm: {
          success: true,
          error: null
        },
        [action.payload.id]: action.payload
      }
    case SETUP_DATA_SOURCE.REJECTED:
      return {
        ...state,
        setupForm: {
          success: false,
          error: action.payload.data
        }
      }
    case PUT_DATA_SOURCE_DATA.PENDING:
      return {
        ...state,
        putFeedback: {
          ...state.putFeedback,
          [action.payload.id]: parsePendingState(
            state.putFeedback[action.payload.id] || { ...formState },
            action.payload
          )
        }
      }
    case PUT_DATA_SOURCE_DATA.FULFILLED:
      return {
        ...state,
        putFeedback: {
          ...state.putFeedback,
          [action.payload.id]: parseApiSuccess(state.putFeedback[action.payload.id], action.payload)
        }
      }
    case PUT_DATA_SOURCE_DATA.REJECTED:
      return {
        ...state,
        putFeedback: {
          ...state.putFeedback,
          [action.payload.id]: parseApiError(state.putFeedback[action.payload.id], action.payload)
        }
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default dataSourcesReducer

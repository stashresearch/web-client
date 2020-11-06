import { LOGOUT } from './../actions/logout.action'
import { FETCH_DATA_PREVIEW } from './../actions/fetchDataPreview.action'
import { FETCH_DATA_SOURCE_DATA } from './../actions/projects/dataSources/fetchDataSourceData.action'

const defaultState = {}

function dataPreviewReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_DATA_SOURCE_DATA.FULFILLED:
      return {
        ...state,
        [action.payload.dataSourceId]: action.payload
      }
    case FETCH_DATA_PREVIEW.FULFILLED:
      return {
        ...state,
        [action.payload.dataSourceId]: action.payload.data
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default dataPreviewReducer

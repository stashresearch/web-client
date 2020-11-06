import { LOGOUT } from './../actions/logout.action'
import { FETCH_DATA_SOURCE_HISTORY } from './../actions/projects/fetchDataSourceHistory.action'
import { FETCH_DIFF } from './../actions/projects/fetchDiff.action'
import getDiffKey from './../lib/getDiffKey'

const defaultState = {
  diffs: {}
}

function dataSourceHistoryReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_DATA_SOURCE_HISTORY.FULFILLED:
      return {
        ...state,
        [action.payload.dataSourceId]: action.payload.history
      }
    case FETCH_DIFF.FULFILLED:
      return {
        ...state,
        diffs: {
          ...state.diffs,
          [getDiffKey(action.payload._target, action.payload._source)]: action.payload
        }
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default dataSourceHistoryReducer

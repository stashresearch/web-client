import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const FETCH_DATA_SOURCE_HISTORY = createAsyncActionTypes('FETCH_DATA_SOURCE_HISTORY')

function fetchDataSourceHistory ({ dataSourceId }) {
  return {
    type: FETCH_DATA_SOURCE_HISTORY.type,
    payload: Api.get(`/dataSources/${dataSourceId}/history`).then((history) => {
      return {
        dataSourceId,
        history
      }
    })
  }
}

export default fetchDataSourceHistory

export {
  FETCH_DATA_SOURCE_HISTORY
}

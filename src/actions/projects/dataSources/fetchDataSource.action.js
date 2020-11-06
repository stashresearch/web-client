import createAsyncActionTypes from './../../../createAsyncActionTypes'
import Api from './../../../ApiV2'

const FETCH_DATA_SOURCE = createAsyncActionTypes('FETCH_DATA_SOURCE')

function fetchDataSource (id) {
  return {
    type: FETCH_DATA_SOURCE.type,
    payload: Api.get(`/dataSources/${id}`)
  }
}

export default fetchDataSource

export {
  FETCH_DATA_SOURCE
}

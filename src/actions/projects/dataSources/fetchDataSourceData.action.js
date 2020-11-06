import createAsyncActionTypes from './../../../createAsyncActionTypes'
import Api from './../../../ApiV2'

const FETCH_DATA_SOURCE_DATA = createAsyncActionTypes('FETCH_DATA_SOURCE_DATA')

function fetchDataSourceData (id) {
  return {
    type: FETCH_DATA_SOURCE_DATA.type,
    payload: Api.get(`/dataSources/${id}/data`).then((res) => {
      res.dataSourceId = id
      return res
    })
  }
}

export default fetchDataSourceData

export {
  FETCH_DATA_SOURCE_DATA
}

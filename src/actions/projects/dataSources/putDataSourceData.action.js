import createAsyncActionTypes from './../../../createAsyncActionTypes'
import Api from './../../../ApiV2'

const PUT_DATA_SOURCE_DATA = createAsyncActionTypes('PUT_DATA_SOURCE_DATA')

function putDataSourceData ({ id, data, columnNames, checksum }) {
  return {
    type: PUT_DATA_SOURCE_DATA.type,
    payload: {
      promise: Api.put(`/dataSources/${id}/data`, { data, columnNames, checksum })
        .catch((e) => { e.id = id; return Promise.reject(e) }),
      data: { id }
    }
  }
}

export default putDataSourceData

export {
  PUT_DATA_SOURCE_DATA
}

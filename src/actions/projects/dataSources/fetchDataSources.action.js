import createAsyncActionTypes from '../../../createAsyncActionTypes'
import Api from '../../../ApiV2'

const FETCH_DATA_SOURCES = createAsyncActionTypes('FETCH_DATA_SOURCES')

function fetchdataSources (id) {
  return {
    type: FETCH_DATA_SOURCES.type,
    payload: Api.get(`/projects/${id}/dataSources`).then((res) => {
      return {
        projectId: id,
        dataSources: res
      }
    })
  }
}

export default fetchdataSources

export {
  FETCH_DATA_SOURCES
}

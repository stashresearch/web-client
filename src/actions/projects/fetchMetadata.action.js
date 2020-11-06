import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../Api'

const FETCH_METADATA = createAsyncActionTypes('FETCH_METADATA')

function fetchMetadata ({ projectId }) {
  return {
    type: FETCH_METADATA.type,
    // payload: Api.get(`/projects/${projectId}/metadata`)
    payload: Promise.resolve({})
  }
}

export default fetchMetadata

export {
  FETCH_METADATA
}

import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../Api'

const FETCH_DIFF = createAsyncActionTypes('FETCH_DIFF')

function fetchDiff ({ projectId, dataSourceId, target, source }) {
  const sourceParam = source == null ? '' : `/${source}`
  return {
    type: FETCH_DIFF.type,
    payload: Api.get(`/projects/${projectId}/dataSources/${dataSourceId}/diff/${target}${sourceParam}`).then((res) => {
      res._target = target
      res._source = source
      return res
    })
  }
}

export default fetchDiff

export {
  FETCH_DIFF
}

import createAsyncActionTypes from './../createAsyncActionTypes'
import Api from './../Api'

const FETCH_DATA_PREVIEW = createAsyncActionTypes('FETCH_DATA_PREVIEW')

function fetchDataPreview ({ dataSourceId, localPath }) {
  return {
    type: FETCH_DATA_PREVIEW.type,
    payload: Api.getCSV(`/file/${localPath}`).then((data) => ({
      data,
      dataSourceId
    }))
  }
}

export default fetchDataPreview

export {
  FETCH_DATA_PREVIEW
}

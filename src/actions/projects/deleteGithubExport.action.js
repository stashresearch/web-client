import createAsyncActionTypes from '../../createAsyncActionTypes'
import Api from '../../ApiV2'

const DELETE_GITHUB_EXPORT = createAsyncActionTypes('DELETE_GITHUB_EXPORT')

function deleteGithubExport (id) {
  return {
    type: DELETE_GITHUB_EXPORT.type,
    payload: Api.delete(`/projects/${id}/gitSync`, { removeFiles: false })
  }
}

export default deleteGithubExport

export {
  DELETE_GITHUB_EXPORT
}

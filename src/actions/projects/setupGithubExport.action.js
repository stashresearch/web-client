import createAsyncActionTypes from '../../createAsyncActionTypes'
import Api from '../../ApiV2'

const SETUP_GITHUB_EXPORT = createAsyncActionTypes('SETUP_GITHUB_EXPORT')

function setupGithubExport (id, cloneCommand) {
  return {
    type: SETUP_GITHUB_EXPORT.type,
    payload: Api.post(`/projects/${id}/setupGitSync`, { cloneCommand, provider: 'github' })
  }
}

export default setupGithubExport

export {
  SETUP_GITHUB_EXPORT
}

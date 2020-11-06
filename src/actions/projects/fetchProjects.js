import Api from '../../ApiV2'
import createAsyncActionTypes from '../../createAsyncActionTypes'

const FETCH_PROJECTS = createAsyncActionTypes('FETCH_PROJECTS')

function fetchProjects (withKeys = false) {
  return {
    type: FETCH_PROJECTS.type,
    payload: Api.get(`/projects/${withKeys ? '?withKeys=true' : ''}`)
  }
}

export default fetchProjects

export {
  FETCH_PROJECTS
}

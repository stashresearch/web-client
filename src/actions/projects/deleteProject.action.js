import Api from '../../ApiV2'
import createAsyncActionTypes from '../../createAsyncActionTypes'
import fetchProjects from './fetchProjects'

const DELETE_PROJECT = createAsyncActionTypes('DELETE_PROJECT')

function deleteProject ({ projectId }) {
  return function (dispatch) {
    return {
      type: DELETE_PROJECT.type,
      payload: Api.delete(`/projects/${projectId}`).then((res) => {
        dispatch(fetchProjects())
      })
    }
  }
}

export default deleteProject

export {
  DELETE_PROJECT
}

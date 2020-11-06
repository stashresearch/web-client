import createAsyncActionTypes from '../../createAsyncActionTypes'
import Api from '../../ApiV2'
import fetchProject from './fetchProject.action'

const UPDATE_PRIVATE_KEY = createAsyncActionTypes('UPDATE_PRIVATE_KEY')

function updatePrivateKey ({ projectId, encryptedPrivateKey }) {
  return function (dispatch) {
    return {
      type: UPDATE_PRIVATE_KEY.type,
      payload: Api.put(`/projects/${projectId}/key`, { encryptedPrivateKey })
        .then(async (r) => {
          await dispatch(fetchProject({ id: projectId }))
          return {
            ...r,
            projectId
          }
        })
    }
  }
}

export default updatePrivateKey

export {
  UPDATE_PRIVATE_KEY
}

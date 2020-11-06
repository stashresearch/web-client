import createAsyncActionTypes from '../../createAsyncActionTypes'
import Api from '../../ApiV2'
import fetchProject from './fetchProject.action'

const SET_PROJECT_KEY = createAsyncActionTypes('SET_PROJECT_KEY')

function setProjectKey (id, { publicKey, privateKey }) {
  return function (dispatch) {
    return {
      type: SET_PROJECT_KEY.type,
      payload: Api.post(`/projects/${id}/key`, { publicKey, encryptedPrivateKey: privateKey }).then(async (res) => {
        await dispatch(fetchProject({ id }))
        return res
      })
    }
  }
}

export default setProjectKey

export {
  SET_PROJECT_KEY
}

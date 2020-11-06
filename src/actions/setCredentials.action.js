import createAsyncActionTypes from '../createAsyncActionTypes'
import Api from '../ApiV2'

const SET_CREDENTIALS = createAsyncActionTypes('SET_CREDENTIALS')

/**
 * @param {*} { provider }
 *  formr params: { clientId, clientSecret }
 */
function setCredentials ({ provider, ...params }) {
  return {
    type: SET_CREDENTIALS.type,
    payload: Api.post('/user/me/credentials', { provider, ...params })
  }
}

export default setCredentials

export {
  SET_CREDENTIALS
}

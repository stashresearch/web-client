import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const CHANGE_PASSWORD = createAsyncActionTypes('CHANGE_PASSWORD')

/**
 * change password action throught API
 * @param {*} param0
 *  currentPassword = undefined if user not logged in (forgot password workflow)
 */
function changePassword ({ password, token, currentPassword = undefined }) {
  const changeUrl = currentPassword != null ? '/user/me/password' : '/user/password'
  const params = {
    password,
    token,
    currentPassword
  }
  return {
    type: CHANGE_PASSWORD.type,
    payload: Api.put(changeUrl, params)
  }
}

export default changePassword

export {
  CHANGE_PASSWORD
}

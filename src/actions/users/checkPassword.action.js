
import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const CHECK_PASSWORD = createAsyncActionTypes('CHECK_PASSWORD')

function checkPassword (password) {
  return {
    type: CHECK_PASSWORD.type,
    payload: Api.post('/user/me/checkPassword', { password })
  }
}

export default checkPassword

export {
  CHECK_PASSWORD
}

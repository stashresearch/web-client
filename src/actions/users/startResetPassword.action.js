import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const START_RESET_PASSWORD = createAsyncActionTypes('START_RESET_PASSWORD')

function startResetPassword (email = null) {
  const url = email ? '/user/passwordReset' : '/user/me/passwordReset'
  return {
    type: START_RESET_PASSWORD.type,
    payload: Api.post(url, email ? { email } : undefined)
  }
}

export default startResetPassword

export {
  START_RESET_PASSWORD
}

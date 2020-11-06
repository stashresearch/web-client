import createAsyncActionTypes from './../createAsyncActionTypes'
import Api from './../ApiV2'

const FETCH_CURRENT_USER = createAsyncActionTypes('FETCH_CURRENT_USER')

function fetchCurrentUser () {
  return {
    type: FETCH_CURRENT_USER.type,
    payload: Api.get('/user/me')
  }
}

export default fetchCurrentUser

export {
  FETCH_CURRENT_USER
}

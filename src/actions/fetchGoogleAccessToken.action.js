import createAsyncActionTypes from './../createAsyncActionTypes'
import Api from './../ApiV2'

// TODO: depricated, use fetchCredentials.action instead
const FETCH_GOOGLE_ACCESS_TOKEN = createAsyncActionTypes('FETCH_GOOGLE_ACCESS_TOKEN')

function fetchGoogleAccessToken () {
  return {
    type: FETCH_GOOGLE_ACCESS_TOKEN.type,
    payload: Api.get('/user/me/credentials/google')
  }
}

export default fetchGoogleAccessToken

export {
  FETCH_GOOGLE_ACCESS_TOKEN
}

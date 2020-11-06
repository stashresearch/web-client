import createAsyncActionTypes from '../../createAsyncActionTypes'
import Api from '../../ApiV2'

const FETCH_CREDENTIALS = createAsyncActionTypes('FETCH_CREDENTIALS')

function fetchCredentials ({ provider }) {
  return {
    type: FETCH_CREDENTIALS.type,
    payload: {
      promise: new Promise(function (resolve, reject) {
        Api.get(`/user/me/credentials/${provider}`)
          .then(resolve)
          .catch((e) => {
            e.provider = provider
            reject(e)
          })
      }),
      data: {
        provider
      }
    }
  }
}

export default fetchCredentials

export {
  FETCH_CREDENTIALS
}

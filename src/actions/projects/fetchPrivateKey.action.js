import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const FETCH_PRIVATE_KEY = createAsyncActionTypes('FETCH_PRIVATE_KEY')

function fetchPrivateKey (id) {
  return {
    type: FETCH_PRIVATE_KEY.type,
    payload: Api.get(`/projects/${id}/key`).then((res) => {
      res.id = id
      return res
    })
  }
}

export default fetchPrivateKey

export {
  FETCH_PRIVATE_KEY
}

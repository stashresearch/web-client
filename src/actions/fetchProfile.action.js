import createAsyncActionTypes from './../createAsyncActionTypes'
import Api from './../ApiV2'

const FETCH_PROFILE = createAsyncActionTypes('FETCH_PROFILE')

function fetchProfile ({ handle }) {
  return {
    type: FETCH_PROFILE.type,
    payload: Api.get(`/user/${handle}`).then((r) => {
      r.name = handle
      return r
    })
  }
}

export default fetchProfile

export {
  FETCH_PROFILE
}


const SET_GOOGLE_API_LOAD_ERROR = 'SET_GOOGLE_API_LOAD_ERROR'

function setGoogleApiLoadError ({ error }) {
  return {
    type: SET_GOOGLE_API_LOAD_ERROR,
    payload: { error }
  }
}

export default setGoogleApiLoadError

export {
  SET_GOOGLE_API_LOAD_ERROR
}

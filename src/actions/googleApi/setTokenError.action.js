
const SET_GOOGLE_TOKEN_ERROR = 'SET_GOOGLE_TOKEN_ERROR'

function setGoogleTokenError ({ error }) {
  return {
    type: SET_GOOGLE_TOKEN_ERROR,
    payload: { error }
  }
}

export default setGoogleTokenError

export {
  SET_GOOGLE_TOKEN_ERROR
}

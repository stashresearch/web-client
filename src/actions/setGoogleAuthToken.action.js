
const SET_GOOGLE_AUTH_TOKEN = 'SET_GOOGLE_AUTH_TOKEN'

function setGoogleAuthToken ({ token }) {
  return {
    type: SET_GOOGLE_AUTH_TOKEN,
    payload: { token }
  }
}

export default setGoogleAuthToken

export {
  SET_GOOGLE_AUTH_TOKEN
}

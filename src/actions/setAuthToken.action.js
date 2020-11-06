
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'

function setAuthToken ({ token }) {
  return {
    type: SET_AUTH_TOKEN,
    payload: { token }
  }
}

export default setAuthToken

export {
  SET_AUTH_TOKEN
}


const SET_PASSWORD_HASH = 'SET_PASSWORD_HASH'

function setPasswordHash (hash) {
  return {
    type: SET_PASSWORD_HASH,
    payload: {
      hash
    }
  }
}

export default setPasswordHash

export {
  SET_PASSWORD_HASH
}


const SET_GOOGLE_API_LOADING = 'SET_GOOGLE_API_LOADING'

function setGoogleApiLoading ({ loading }) {
  return {
    type: SET_GOOGLE_API_LOADING,
    payload: { loading }
  }
}

export default setGoogleApiLoading

export {
  SET_GOOGLE_API_LOADING
}

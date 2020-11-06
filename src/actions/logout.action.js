import history from './../history'

const LOGOUT = 'LOGOUT'

function logout () {
  return function (dispatch) {
    dispatch({
      type: LOGOUT
    })
    history.push('/')
  }
}

export default logout

export {
  LOGOUT
}

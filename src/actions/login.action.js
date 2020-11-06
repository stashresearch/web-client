import Api from './../ApiV2'
import createAsyncActionTypes from './../createAsyncActionTypes'
import setAuthToken from './setAuthToken.action'
import fetchCurrentUser from './fetchCurrentUser.action'

const LOGIN = createAsyncActionTypes('LOGIN')

function login ({ email, password }) {
  return function (dispatch) {
    dispatch({
      type: LOGIN.type,
      payload: new Promise(function (resolve, reject) {
        Api.post('/auth/login', { email, password }).then(async (res) => {
          dispatch(setAuthToken({ token: res.token }))
          await dispatch(fetchCurrentUser())
          resolve(res)
          return res
        }).catch(reject)
      })
    })
  }
}

export default login

export {
  LOGIN
}

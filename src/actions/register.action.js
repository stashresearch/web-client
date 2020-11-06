import Api from './../ApiV2'
import createAsyncActionTypes from './../createAsyncActionTypes'
import setAuthToken from './setAuthToken.action'
import fetchCurrentUser from './../actions/fetchCurrentUser.action'

const REGISTER = createAsyncActionTypes('REGISTER')

function register ({ email, password, firstName, lastName, name }) {
  return function (dispatch) {
    dispatch({
      type: REGISTER.type,
      payload: new Promise(function (resolve, reject) {
        Api.post('/auth/signup', { email, password, firstName, lastName }).then(async (res) => {
          dispatch(setAuthToken({ token: res.token }))
          await dispatch(fetchCurrentUser())
          resolve(res)
          return res
        }).catch(reject)
      })
    })
  }
}

export default register

export {
  REGISTER
}

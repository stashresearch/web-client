import { LOGOUT } from './../actions/logout.action'
import { CHECK_PASSWORD } from './../actions/users/checkPassword.action'
import { RESET_PASSWORD_CHECK } from './../actions/users/resetPasswordCheck.action'
import { START_RESET_PASSWORD } from './../actions/users/startResetPassword.action'
import { CHANGE_PASSWORD } from './../actions/users/changePassword.action'
import { formState } from './../config/'
import { parseApiError, parseApiSuccess, parsePendingState } from './../lib/handleFormResponse'

const defaultState = {
  passwordValid: false,
  checkPasswordForm: { ...formState },
  resetPassword: { ...formState },
  changePassword: { ...formState }
}

function usersReducer (state = defaultState, action) {
  switch (action.type) {
    case CHECK_PASSWORD.PENDING:
      return {
        ...state,
        passwordValid: false
      }
    case CHECK_PASSWORD.FULFILLED:
      return {
        ...state,
        passwordValid: true
      }
    case CHECK_PASSWORD.REJECTED:
      return {
        ...state,
        passwordValid: false
      }
    case RESET_PASSWORD_CHECK:
      return {
        ...state,
        passwordValid: false
      }
    case START_RESET_PASSWORD.PENDING:
      return {
        ...state,
        resetPassword: parsePendingState(state.resetPassword, action.payload)
      }
    case START_RESET_PASSWORD.FULFILLED:
      return {
        ...state,
        resetPassword: parseApiSuccess(state.resetPassword, action.payload)
      }
    case START_RESET_PASSWORD.REJECTED:
      return {
        ...state,
        resetPassword: parseApiError(state.resetPassword, action.payload)
      }
    case CHANGE_PASSWORD.PENDING:
      return {
        ...state,
        changePassword: parsePendingState(state.changePassword, action.payload)
      }
    case CHANGE_PASSWORD.FULFILLED:
      return {
        ...state,
        changePassword: parseApiSuccess(state.changePassword, action.payload)
      }
    case CHANGE_PASSWORD.REJECTED:
      console.debug(action.payload)
      return {
        ...state,
        changePassword: parseApiError(state.changePassword, action.payload)
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default usersReducer

import { ALT_LOGIN_FORM } from './../actions/alterLoginForm.action'
import { LOGIN } from './../actions/login.action'
import { LOGOUT } from './../actions/logout.action'
import { formState } from './../config/'
import { parseApiError, parsePendingState, parseApiSuccess } from './../lib/handleFormResponse'

const defaultState = {
  form: {
    email: '',
    password: ''
  },
  loginForm: { ...formState },
  logging: false,
  errors: []
}

const invalidCredentialsMessage = 'Email or Password is incorrect'

function loginReducer (state = defaultState, action) {
  switch (action.type) {
    case ALT_LOGIN_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value
        }
      }
    case LOGIN.PENDING:
      return {
        ...state,
        logging: true,
        loginForm: parsePendingState(state, action.payload)
      }
    case LOGIN.FULFILLED:
      return {
        ...state,
        logging: false,
        form: defaultState.form,
        loginForm: parseApiSuccess(action.payload)
      }
    case LOGIN.REJECTED:
      return {
        ...state,
        loginForm: parseApiError(state.loginForm, action.payload),
        logging: false,
        errors: action.payload.code === 401
          ? ([{ field: null, message: invalidCredentialsMessage }]) : (action.payload.data || [])
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default loginReducer

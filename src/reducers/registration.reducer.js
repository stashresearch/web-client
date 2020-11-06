import { LOGOUT } from './../actions/logout.action'
import { ALT_SIGNUP_FORM } from '../actions/alterSignupForm.action'
import { REGISTER } from '../actions/register.action'

const defaultState = {
  form: {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  },
  registering: false,
  register: {
    status: null,
    response: null
  },
  errors: []
}

function registrationReducer (state = defaultState, action) {
  switch (action.type) {
    case ALT_SIGNUP_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value
        }
      }
    case REGISTER.PENDING:
      return {
        ...state,
        registering: true
      }
    case REGISTER.FULFILLED:
      return {
        ...state,
        registering: false,
        register: {
          status: 'success',
          response: action.payload
        }
      }
    case REGISTER.REJECTED:
      return {
        ...state,
        registering: false,
        register: {
          status: 'error',
          response: action.payload
        },
        errors: action.payload.data || []
      }
    // case REGISTER:
    //   console.log(action)
    //   return {
    //     ...state,
    //     register: {
    //       status: action.error ? 'error' : 'success',
    //       response: action.payload
    //     },
    //     errors: action.error ? (action.payload.data || []) : []
    //   }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default registrationReducer

import { LOGOUT } from './../actions/logout.action'
import { ALT_FORMR_AUTH_FORM } from './../actions/formr/alterFormrAuthForm.action'
import { ALT_FORMR_SOURCE_FORM } from './../actions/formr/alterFormrSourceForm.action'
import { CREATE_DATA_SOURCE } from './../actions/projects/createDataSource.action'

const defaultState = {
  authorizeForm: {
    clientSecret: '',
    clientId: ''
  },
  newDataSourceForm: {
    sourceSurveyName: '',
    sourceName: '',
    name: ''
  }
}

function formrReducer (state = defaultState, action) {
  switch (action.type) {
    case ALT_FORMR_AUTH_FORM:
      return {
        ...state,
        authorizeForm: {
          ...state.authorizeForm,
          [action.payload.name]: action.payload.value
        }
      }
    case ALT_FORMR_SOURCE_FORM:
      return {
        ...state,
        newDataSourceForm: {
          ...state.newDataSourceForm,
          [action.payload.name]: action.payload.value
        }
      }
    case CREATE_DATA_SOURCE.FULFILLED:
      return {
        ...state,
        newDataSourceForm: defaultState.newDataSourceForm
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default formrReducer

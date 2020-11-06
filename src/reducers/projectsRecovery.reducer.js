import { LOGOUT } from './../actions/logout.action'
import { formState } from './../config/'

const defaultState = {
  checkPasswordForm: { ...formState }
}

function projectsRecoveryReducer (state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default projectsRecoveryReducer

import { LOGOUT } from './../actions/logout.action'
import { FETCH_PROJECTS } from '../actions/projects/fetchProjects'
import { ALT_PROJECT_NEW_FORM } from '../actions/projects/alterProjectNewForm.action'
import { CREATE_PROJECT } from '../actions/projects/createProject.action'
import { FETCH_PROJECT } from './../actions/projects/fetchProject.action'
import { CREATE_DATA_SOURCE } from './../actions/projects/createDataSource.action'
import { SET_PASSWORD_HASH } from './../actions/projects/setPasswordHash.action'
import { FETCH_PRIVATE_KEY } from './../actions/projects/fetchPrivateKey.action'
import { DECRYPT_PRIVATE_KEY } from './../actions/projects/decryptPrivateKey.action'
import { ERASE_DECRYPTED_PRIVATE_KEY } from './../actions/projects/eraseDecryptedPrivateKey.action'
import { RESET_CREATE_DATA_SOURCE } from './../actions/projects/resetCreateDataSource.action'
import { formState } from './../config/'
import { parseApiSuccess, parsePendingState, parseApiError } from './../lib/handleFormResponse'
import { SETUP_GITHUB_EXPORT } from './../actions/projects/setupGithubExport.action'
import { DELETE_GITHUB_EXPORT } from './../actions/projects/deleteGithubExport.action'
import { UPDATE_PRIVATE_KEY } from './../actions/projects/updatePrivateKey.action'
import { INVITE_MEMBER } from './../actions/projects/inviteMember.action'

const defaultState = {
  fetching: false,
  list: [],
  formNew: {
    name: '',
    access: 'public',
    description: '',
    sending: false,
    success: false,
    errors: [],
    created: null
  },
  formSetup: {
    hash: null,
    errors: []
  },
  newDataSource: {
    created: null,
    extraData: null, // for CSV upload caries parsed data over for next step
    sending: false,
    error: null
  },
  githubExport: { ...formState },
  inviteForm: { ...formState }
}

function projectsReducer (state = defaultState, action) {
  switch (action.type) {
    case ALT_PROJECT_NEW_FORM:
      return {
        ...state,
        formNew: {
          ...state.formNew,
          success: false,
          [action.payload.field]: action.payload.value
        }
      }
    case CREATE_PROJECT.PENDING:
      return {
        ...state,
        formNew: {
          ...state.formNew,
          sending: true,
          success: false,
          errors: []
        }
      }
    case CREATE_PROJECT.FULFILLED:
      return {
        ...state,
        formNew: {
          ...defaultState.formNew,
          success: true,
          created: action.payload.id
        },
        [action.payload.id]: action.payload
      }
    case CREATE_PROJECT.REJECTED:
      return {
        ...state,
        formNew: {
          ...defaultState.formNew,
          success: false,
          errors: action.payload.data || []
        }
      }
    case FETCH_PROJECTS.PENDING:
      return {
        ...state,
        fetching: true
      }
    case FETCH_PROJECTS.FULFILLED:
      return {
        ...state,
        fetching: false,
        list: action.payload
      }
    case FETCH_PROJECTS.REJECTED:
      return {
        ...state,
        fetching: false
      }
    case FETCH_PROJECT.FULFILLED:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case CREATE_DATA_SOURCE.PENDING:
      return {
        ...state,
        newDataSource: {
          ...defaultState.newDataSource,
          sending: true
        }
      }
    case CREATE_DATA_SOURCE.FULFILLED:
      return {
        ...state,
        newDataSource: {
          ...state.newDataSource,
          created: action.payload.id,
          sending: false,
          extraData: action.payload.extraData
        }
      }
    case CREATE_DATA_SOURCE.REJECTED:
      return {
        ...state,
        newDataSource: {
          ...state.newDataSource,
          sending: false,
          error: action.payload.data ? action.payload.data : action.payload
        }
      }
    case SET_PASSWORD_HASH:
      return {
        ...state,
        formSetup: {
          ...state.formSetup,
          hash: action.payload.hash
        }
      }
    case FETCH_PRIVATE_KEY.FULFILLED:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          publicKey: action.payload.publicKey,
          encryptedPrivateKey: action.payload.encryptedPrivateKey || action.payload.privateKey
        }
      }
    case UPDATE_PRIVATE_KEY.FULFILLED:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          encryptedPrivateKey: action.payload.encryptedPrivateKey,
          decryptedPrivateKey: null
        }
      }
    case DECRYPT_PRIVATE_KEY.FULFILLED:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          decryptedPrivateKey: action.payload.privateKey
        }
      }
    case ERASE_DECRYPTED_PRIVATE_KEY:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          decryptedPrivateKey: null
        }
      }
    case RESET_CREATE_DATA_SOURCE:
      return {
        ...state,
        newDataSource: defaultState.newDataSource
      }
    case INVITE_MEMBER.PENDING:
      return {
        ...state,
        inviteForm: parsePendingState(state.inviteForm, action.payload)
      }
    case INVITE_MEMBER.FULFILLED:
      return {
        ...state,
        inviteForm: parseApiSuccess(state.inviteForm, action.payload)
      }
    case INVITE_MEMBER.REJECTED:
      return {
        ...state,
        inviteForm: parseApiError(state.inviteForm, action.payload)
      }
    case SETUP_GITHUB_EXPORT.PENDING:
      return {
        ...state,
        githubExport: parsePendingState(state.githubExport, action.payload)
      }
    case SETUP_GITHUB_EXPORT.FULFILLED:
      return {
        ...state,
        githubExport: parseApiSuccess(state.githubExport, action.payload),
        [action.payload.id]: action.payload
      }
    case SETUP_GITHUB_EXPORT.REJECTED:
      return {
        ...state,
        githubExport: parseApiError(state.githubExport, action.payload)
      }
    case DELETE_GITHUB_EXPORT.FULFILLED:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default projectsReducer

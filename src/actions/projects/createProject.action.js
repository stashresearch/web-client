import Api from '../../ApiV2'
import createAsyncActionTypes from '../../createAsyncActionTypes'

const CREATE_PROJECT = createAsyncActionTypes('CREATE_PROJECT')

function createProject ({ name, access, description }) {
  return {
    type: CREATE_PROJECT.type,
    payload: Api.post('/projects/', { name, access, description })
  }
}

export default createProject

export {
  CREATE_PROJECT
}

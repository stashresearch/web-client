import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const FETCH_PROJECT = createAsyncActionTypes('FETCH_PROJECT')

function fetchProject ({ id }) {
  return {
    type: FETCH_PROJECT.type,
    payload: Api.get(`/projects/${id}`)
  }
}

export default fetchProject

export {
  FETCH_PROJECT
}

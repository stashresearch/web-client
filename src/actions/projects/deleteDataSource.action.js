import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'
import fetchProject from './fetchProject.action'
import fetchDataSources from './dataSources/fetchDataSources.action'

const DELETE_DATA_SOURCE = createAsyncActionTypes('DELETE_DATA_SOURCE')

function deleteDataSource ({ projectId, id }) {
  return function (dispatch) {
    dispatch({
      type: DELETE_DATA_SOURCE.type,
      payload: new Promise(function (resolve, reject) {
        Api.delete(`/dataSources/${id}`)
          .then((res) => {
            dispatch(fetchDataSources(projectId))
            resolve({})
          })
          .catch(reject)
      })
    })
  }
}

export default deleteDataSource

export {
  DELETE_DATA_SOURCE
}

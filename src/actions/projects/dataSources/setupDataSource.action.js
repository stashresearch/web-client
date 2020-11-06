import createAsyncActionTypes from './../../../createAsyncActionTypes'
import Api from './../../../ApiV2'

const SETUP_DATA_SOURCE = createAsyncActionTypes('SETUP_DATA_SOURCE')

function setupDataSource ({ id, key, omit, personalData }) {
  return {
    type: SETUP_DATA_SOURCE.type,
    payload: Api.post(`/dataSources/${id}/setup`, { key, omit, personalData })
  }
}

export default setupDataSource

export {
  SETUP_DATA_SOURCE
}

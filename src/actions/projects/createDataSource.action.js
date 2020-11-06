import Api from '../../ApiV2'
import createAsyncActionTypes from '../../createAsyncActionTypes'
import fetchProject from './fetchProject.action'
import fetchDataSources from './dataSources/fetchDataSources.action'

const CREATE_DATA_SOURCE = createAsyncActionTypes('CREATE_DATA_SOURCE')

/**
 * @param {*} { projectId, provider, sourceName }
 *  google: { sourceId, sourceUrl, sourceEmbedUrl }
 *  formr: { sourceSurveyName, name }
 */
function createDataSource ({ projectId, provider, sourceName, extraData = null, ...params }) {
  return function (dispatch) {
    dispatch({
      type: CREATE_DATA_SOURCE.type,
      payload: Api.post(
        '/dataSources',
        { projectId, provider, sourceName, ...params }
      ).then((res) => {
        dispatch(fetchDataSources(projectId))
        res.extraData = extraData
        return res
      })
    })
  }
}

export default createDataSource

export {
  CREATE_DATA_SOURCE
}

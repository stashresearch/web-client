import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import fetchDataSource from './../../../actions/projects/dataSources/fetchDataSource.action'
import fetchProject from './../../../actions/projects/fetchProject.action'
import Loading from './../../Loading'
import { MANUAL_SYNC } from './../../../config/const'
import ManualFileUpload from './syncSettings/ManualFileUpload'
import EmptyState from './../../lib/EmptyState'

// TODO: update sourceName if new file name doesn't match

export default function DsSyncSettings ({ dataSourceId, ...props }) {

  const dispatch = useDispatch()
  const dataSource = useSelector((state) => state.dataSources[dataSourceId])
  const project = useSelector((state) => state.projects[dataSource?.projectId])

  React.useEffect(() => {
    if (dataSource == null) {
      dispatch(fetchDataSource(dataSourceId))
    }
  }, [dataSource])

  React.useEffect(() => {
    if (dataSource != null && project == null) {
      dispatch(fetchProject({ id: dataSource.projectId }))
    }
  }, [dataSource, project])

  if (dataSource == null || project == null) {
    return <Loading />
  }

  return (
    <div>
      <h4 className="page-title">
        { project.name } / { dataSource.name || dataSource.sourceName }
      </h4>
      { dataSource.syncMethod === MANUAL_SYNC && (
        <ManualFileUpload dataSourceId={ dataSourceId } sourceName={ dataSource.sourceName } />)}
      { dataSource.syncMethod !== MANUAL_SYNC && (
        <EmptyState noBorder text="COMING SOON" />)}
    </div>
  )
}

DsSyncSettings.propTypes = {
  dataSourceId: PropTypes.string.isRequired
}

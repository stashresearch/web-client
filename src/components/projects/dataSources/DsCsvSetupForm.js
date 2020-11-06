import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import resetCreateDataSource from './../../../actions/projects/resetCreateDataSource.action'
import UpdateCsvDs from './UpdateCsvDs'
import history from '../../../history'

export default function DsCsvSetupForm ({ dataSourceId, ...props }) {

  const dispatch = useDispatch()
  const extraData = useSelector((state) => state.projects.newDataSource.extraData)

  function onSent (dataSource) {
    dispatch(resetCreateDataSource())
    history.push(`/projects/${dataSource.projectId}/settings`)
  }

  return (
    <UpdateCsvDs dataSourceId={ dataSourceId } parsedCsv={ extraData }
      waitingText="You're all set" onSent={ onSent } />
  )
}

DsCsvSetupForm.propTypes = {
  dataSourceId: PropTypes.string.isRequired
}

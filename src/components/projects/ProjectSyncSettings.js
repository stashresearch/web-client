import React from 'react'
import PropTypes from 'prop-types'
import { PackageDependenciesIcon, PackageDependentsIcon } from '@primer/octicons-react'
import EmptyState from '../lib/EmptyState'
import GithubExport from './sync/GithubExport'

export default function ProjectSyncSettings (props) {

  return (
    <div className="nav-tabs-container">
      <h4 className="page-title ">
        <PackageDependentsIcon className="mr-3" size="medium" />
        Export
      </h4>
      {/* <EmptyState noBorder customIcon={PackageDependentsIcon}
        text="Export your project data" /> */}
      <GithubExport projectId={props.projectId} />
      <h4 className="page-title">
        <PackageDependenciesIcon className="mr-3" size="medium" />
        Import
      </h4>
      <EmptyState customIcon={PackageDependenciesIcon} noBorder
        text="Import your project data" subText="coming soon" />
    </div>
  )
}

ProjectSyncSettings.propTypes = {
  projectId: PropTypes.string.isRequired
}

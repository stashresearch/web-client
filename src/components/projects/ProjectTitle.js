import React from 'react'
import PropTypes from 'prop-types'
import { PROJECT_TYPE } from './../../config/propTypes'
import NeedRecoveryButton from './recovery/NeedRecoveryButton'

export default function ProjectTitle ({ project, ...props }) {

  return (
    <h4 className="page-title" { ...props }>
      <span className="project-name">{ project.name }</span>
      <span className="needs-recovery">
        { project.needsRecovery && (
          <NeedRecoveryButton showText />
        ) }
      </span>
    </h4>
  )
}

ProjectTitle.propTypes = {
  project: PROJECT_TYPE.isRequired
}

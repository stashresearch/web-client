import React from 'react'
import Screen from './../Screen'
import ProjectsRecovery from './../../components/projects/recovery/ProjectsRecovery'

export default class Recovery extends Screen {

  static title = 'Projects recovery'

  renderScreen () {
    return (
      <div className="container">
        <ProjectsRecovery />
      </div>
    )
  }
}

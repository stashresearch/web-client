import React from 'react'
import Screen from './Screen'
import ProjectSettings from './../components/projects/ProjectSettings'

export default class ProjectSettingsScreen extends Screen {

  renderScreen () {
    const { id, section } = this.props.match.params
    return (
      <div className="container">
        <ProjectSettings projectId={ id } section={ section } />
      </div>
    )
  }
}

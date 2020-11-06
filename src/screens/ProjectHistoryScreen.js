import React from 'react'
import Screen from './Screen'
import ProjectHistory from './../components/projects/ProjectHistory'

export default class ProjectHistoryScreen extends Screen {

  static title = 'Project history'

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <ProjectHistory projectId={ id } />
      </div>
    )
  }
}

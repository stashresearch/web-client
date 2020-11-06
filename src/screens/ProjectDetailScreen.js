import React from 'react'
import Screen from './Screen'
import ProjectDetail from './../components/projects/ProjectDetail'

export default class ProjectDetailScreen extends Screen {

  static title = 'Project details'

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <ProjectDetail id={ id } />
      </div>
    )
  }
}

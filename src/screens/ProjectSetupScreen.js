import React from 'react'
import Screen from './Screen'
import ProjectSeetupForm from './../components/projects/ProjectSetupForm'

export default class ProjectSetupScreen extends Screen {

  renderScreen () {
    const { projectId } = this.props.match.params
    return (
      <div className="container">
        <ProjectSeetupForm id={ projectId } />
      </div>
    )
  }
}

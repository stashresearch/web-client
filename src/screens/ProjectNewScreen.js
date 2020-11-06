import React from 'react'
import Screen from './Screen'
import ProjectNewForm from './../components/projects/ProjectNewForm'

export default class DashboardScreen extends Screen {

  static title = 'Dashboard'

  renderScreen () {
    return (
      <div className="container">
        <ProjectNewForm />
      </div>
    )
  }
}

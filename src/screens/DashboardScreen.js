import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@primer/octicons-react'
import Screen from './Screen'
import ProjectsList from '../components/projects/ProjectsList'

export default class DashboardScreen extends Screen {

  static title = 'Dashboard'

  renderScreen () {
    return (
      <div className="container">
        <div align="right">
          <Link to="/projects/new" className="btn btn-primary">
            Create project
          </Link>
        </div>
        <ProjectsList />
      </div>
    )
  }
}

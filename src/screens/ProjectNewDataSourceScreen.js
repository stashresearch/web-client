import React from 'react'
import Screen from './Screen'
import NewDataSourceForm from './../components/projects/NewDataSourceForm'

export default class ProjectNewDataSourceScreen extends Screen {

  static title = 'New Data Source'

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <NewDataSourceForm projectId={ id } />
      </div>
    )
  }
}

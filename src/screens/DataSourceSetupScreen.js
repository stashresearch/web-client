import React from 'react'
import Screen from './Screen'
import DataSourceSetupForm from './../components/projects/dataSources/DataSourceSetupForm'

export default class DataSourceSetupScreen extends Screen {

  static title = 'Data Source Setup'

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <h4 className="page-title">Setup Data Source</h4>
        <DataSourceSetupForm id={ id } />
      </div>
    )
  }
}

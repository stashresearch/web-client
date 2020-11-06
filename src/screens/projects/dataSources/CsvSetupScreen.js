import React from 'react'
import Screen from './../../Screen'
import DsCsvSetupForm from './../../../components/projects/dataSources/DsCsvSetupForm'

export default class CsvSetupScreen extends Screen {

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <DsCsvSetupForm dataSourceId={ id } />
      </div>
    )
  }
}

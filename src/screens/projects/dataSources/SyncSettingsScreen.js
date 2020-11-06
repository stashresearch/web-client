import React from 'react'
import Screen from './../../Screen'
import DsSyncSettings from './../../../components/projects/dataSources/DsSyncSettings'

export default class SyncSettingsScreen extends Screen {

  static title = 'Sync Settings'

  renderScreen () {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <DsSyncSettings dataSourceId={ id } />
      </div>
    )
  }
}

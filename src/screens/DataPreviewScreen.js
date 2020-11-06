import React from 'react'
import Screen from './Screen'
import DataSourcesPreviewList from '../components/projects/DataSourcesPreviewList'

export default class DataPreviewScreen extends Screen {

  static title = 'Data Preview'

  renderScreen () {
    const { projectId, dataSourceId } = this.props.match.params
    return (
      <div className="container">
        <DataSourcesPreviewList projectId={ projectId } dataSourceId={ dataSourceId } />
      </div>
    )
  }
}

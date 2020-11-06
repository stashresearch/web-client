import React from 'react'
import Screen from './Screen'
import ProjectDiff from './../components/projects/ProjectDiff'

export default class ProjectDiffScreen extends Screen {

  static title = 'Diff'

  renderScreen () {
    const { projectId, dataSourceId, target, source } = this.props.match.params
    console.log(projectId, dataSourceId, target, source)
    return (
      <div className="container">
        <ProjectDiff projectId={projectId} dataSourceId={ dataSourceId }
          target={ target } source={ source } />
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProjectMenu from './ProjectMenu'
import { PROJECT_TYPE } from './../../config/propTypes'
import fetchProject from './../../actions/projects/fetchProject.action'
import fetchDiff from './../../actions/projects/fetchDiff.action'
import Loading from './../Loading'
import DataSourceDiff from './DataSourceDiff'
import ProjectTitle from './ProjectTitle'

class ProjectDiff extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    dataSourceId: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    source: PropTypes.string,
    // redux
    project: PROJECT_TYPE,
    fetchProject: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { projectId } = this.props
    if (this.props.project == null) {
      this.props.fetchProject({ id: projectId })
    }
  }

  render () {
    const { projectId, project, dataSourceId, target, source } = this.props
    if (project == null) {
      return <Loading />
    }
    return (
      <div className="project-detail">
        <ProjectTitle project={ project } />
        <ProjectMenu active="History" projectId={ projectId } />
        <div className="nav-tabs-container">
          <DataSourceDiff projectId={projectId} dataSourceId={ dataSourceId }
            target={ target } source={ source } />
        </div>
      </div>
    )
  }
}

function mapState (state, props) {
  const { projects } = state
  const project = projects[props.projectId]
  return { project }
}

const actionCreators = {
  fetchProject,
  fetchDiff
}

export default connect(mapState, actionCreators)(ProjectDiff)

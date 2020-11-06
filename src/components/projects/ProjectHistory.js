import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PROJECT_TYPE } from './../../config/propTypes'
import fetchProject from './../../actions/projects/fetchProject.action'
import fetchDataSources from './../../actions/projects/dataSources/fetchDataSources.action'
import fetchDataSourceHistory from './../../actions/projects/fetchDataSourceHistory.action'
import Loading from './../Loading'
import DataSourceHistory from './DataSourceHistory'
import Details from './../lib/Details'
import ProjectPageWrapper from './ProjectPageWrapper'
import EmptyState from './../lib/EmptyState'

class ProjectHistory extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PROJECT_TYPE,
    dataSources: PropTypes.array,
    fetchProject: PropTypes.func.isRequired,
    fetchDataSourceHistory: PropTypes.func.isRequired,
    fetchDataSources: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderDataSource = this.renderDataSource.bind(this)
  }

  componentDidMount () {
    const { projectId } = this.props
    if (this.props.project == null) {
      this.props.fetchProject({ id: projectId })
    }
    if (this.props.dataSources == null) {
      this.props.fetchDataSources(this.props.projectId)
    }
  }

  renderDataSource (dataSource, i) {
    return (
      <Details summary={ dataSource.name } key={i}>
        <DataSourceHistory projectId={ this.props.projectId }
          dataSourceId={ dataSource.id } />
      </Details>
    )
  }

  renderList () {
    const { dataSources } = this.props
    return (
      <div className="nav-tabs-container">
        { dataSources.map(this.renderDataSource) }
      </div>
    )
  }

  renderSetup () {
    return (
      <div className="nav-tabs-container">
        <Link to={`/projects/${this.props.projectId}/settings`}>Setup your project</Link>
      </div>
    )
  }

  render () {
    const { projectId, project, dataSources } = this.props
    if (project == null || dataSources == null) {
      return <Loading />
    }
    return (
      <ProjectPageWrapper projectId={ projectId } active="History">
        <div className="nav-tabs-container">
          { this.renderList() }
        </div>
      </ProjectPageWrapper>
    )
  }
}

function mapState (state, props) {
  const { projects } = state
  const project = projects[props.projectId]
  const dataSources = state.dataSources[props.projectId]
  return { project, dataSources }
}

const actionCreators = {
  fetchProject,
  fetchDataSourceHistory,
  fetchDataSources
}

export default connect(mapState, actionCreators)(ProjectHistory)

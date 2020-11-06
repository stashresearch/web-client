import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import { PROJECT_TYPE, METADATA_TYPE } from './../../config/propTypes'
import fetchProject from './../../actions/projects/fetchProject.action'
import fetchMetadata from './../../actions/projects/fetchMetadata.action'
import DataSourcesList from './DataSourcesList'
import ProjectMenu from './ProjectMenu'
import Loading from './../Loading'
import ProjectTitle from './ProjectTitle'
import ProjectPageWrapper from './ProjectPageWrapper'
import EmptyState from './../lib/EmptyState'

// TODO: check project setup is finished (public/private key)

class ProjectDetail extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    project: PROJECT_TYPE,
    metadata: METADATA_TYPE,
    fetchProject: PropTypes.func.isRequired,
    fetchMetadata: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.project == null) {
      const { id } = this.props
      this.props.fetchProject({ id })
    }
    // if (this.props.metadata == null) {
    //   const { id } = this.props
    //   this.props.fetchMetadata({ projectId: id })
    // }
  }

  renderSetup () {
    return (
      <div className="nav-tabs-container">
        <Link to={`/projects/${this.props.id}/settings`}>Setup your project</Link>
      </div>
    )
  }

  renderDataSource (dataSource, i) {
    return (
      <div className="row" key={i}>
        <div className="row-left">
          { dataSource.name }
        </div>
        <div className="row-body text-muted">
          { dataSource.columns } columns
        </div>
        <div className="row-right">
          { dataSource.rows } rows
        </div>
      </div>
    )
  }

  renderProject () {
    // const { metadata } = this.props
    return (
      <div className="nav-tabs-container">
        <div className="rows">
          <div className="row">
            <div className="row-left">
              PROJECT
            </div>
            <div className="row-body text-muted">
              { /* metadata.dataSources.length */ } data sources ;&nbsp;
              { /* metadata.projectUsers.length */ } users
            </div>
            <div className="row-right">
              { /* metadata.rows */ } rows
            </div>
          </div>
          {/* { metadata.dataSources.map(this.renderDataSource) } */}
        </div>
      </div>
    )
  }

  render () {
    const { project, id, metadata } = this.props
    if (project == null /* || metadata == null */) {
      return <Loading />
    }
    return (
      <ProjectPageWrapper projectId={ id }>
        <div className="nav-tabs-container">
          <EmptyState text="COMING SOON!" noBorder />
        </div>
        {/* { this.renderProject() } */}
        {/* { project.dataSources.length > 0 ? this.renderProject() : this.renderSetup() } */}
      </ProjectPageWrapper>
    )
  }
}

function mapState (state, props) {
  const { projects, metadata } = state
  const project = projects[props.id]
  const meta = metadata[props.id]
  return { project, metadata: meta }
}

const actionCreators = {
  fetchProject,
  fetchMetadata
}

export default connect(mapState, actionCreators)(ProjectDetail)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fetchDataSources from './../../actions/projects/dataSources/fetchDataSources.action'
import { DATA_SOURCE_TYPE } from '../../config/propTypes'
import Loading from '../Loading'
import Details from '../lib/Details'
import DataSourcePreview from './DataSourcePreview'
import DecryptModal from './../DecryptModal'
import ProjectPageWrapper from './ProjectPageWrapper'
import EmptyState from './../lib/EmptyState'

class DataSourcesPreviewList extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    // opened file
    dataSourceId: PropTypes.string,
    dataSources: PropTypes.arrayOf(DATA_SOURCE_TYPE),
    fetchDataSources: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderDataSource = this.renderDataSource.bind(this)
  }

  componentDidMount () {
    if (this.props.dataSources == null || this.props.dataSources.length === 0) {
      this.props.fetchDataSources(this.props.projectId)
    }
  }

  renderDataSource (dataSource, i) {
    const { dataSources, projectId } = this.props
    const opened = (
      dataSources.length === 1 ||
      (this.props.dataSourceId && this.props.dataSourceId === dataSource.id)
    )
    return (
      <Details open={opened} summary={dataSource.name} className="project-data-preview" key={i}>
        <DataSourcePreview
          projectId={ projectId }
          dataSourceId={ dataSource.id }
          localPath={ dataSource.localPath } />
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
        <EmptyState variant="primary" noBorder
          text="There are no data sources in this project yet!"
          actionText="Setup your project"
          action={`/projects/${this.props.projectId}/settings`} />
      </div>
    )
  }

  render () {
    const { projectId, dataSources } = this.props
    if (dataSources == null) {
      return <Loading />
    }
    return (
      <ProjectPageWrapper projectId={ projectId } active="Data">
        { dataSources.length > 0 && (<DecryptModal projectId={projectId} />)}
        { dataSources.length > 0 ? this.renderList() : this.renderSetup() }
      </ProjectPageWrapper>
    )
  }
}

function mapState (state, props) {
  const { dataSources } = state
  const ds = dataSources[props.projectId]
  return { dataSources: ds }
}

const actionCreators = {
  fetchDataSources
}

export default connect(mapState, actionCreators)(DataSourcesPreviewList)

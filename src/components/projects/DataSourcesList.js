import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { LinkExternalIcon, GearIcon } from '@primer/octicons-react'
import { DATA_SOURCE_TYPE } from './../../config/propTypes'
import deleteDataSource from './../../actions/projects/deleteDataSource.action'
import fetchDataSources from '../../actions/projects/dataSources/fetchDataSources.action'
import Loading from './../Loading'
import EmptyState from './../lib/EmptyState'

class DataSourcesList extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    dataSources: PropTypes.arrayOf(DATA_SOURCE_TYPE),
    deleteDataSource: PropTypes.func.isRequired,
    fetchDataSources: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount () {
    if (this.props.dataSources == null) {
      this.props.fetchDataSources(this.props.projectId)
    }
  }

  renderItem (item, i) {
    const { projectId, deleteDataSource } = this.props
    const { id } = item
    return (
      <tr key={i}>
        <td>
          <Link to={`/projects/${projectId}/data/${id}`}>
            { item.name }
          </Link>
        </td>
        <td>
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
            { item.provider } { item.sourceUrl && (<LinkExternalIcon />) }
          </a>
        </td>
        <td>
          <Link className="btn-link-icon btn-link" to={`/dataSources/${id}/sync_settings`}>
            <GearIcon verticalAlign="middle" className="mr-1" />
            { item.syncMethod }{item.syncStatus && ` (${item.syncStatus})`}
          </Link>
        </td>
        <td>
          <Button variant="link" className="text-danger"
            onClick={() => deleteDataSource({ projectId, id })} >
            delete
          </Button>
        </td>
      </tr>
    )
  }

  renderNoSources () {
    return (
      <EmptyState noBorder variant="primary" text="no data sources yet" />
    )
  }

  render () {
    const { dataSources } = this.props
    if (dataSources == null) {
      return <Loading />
    }
    if (dataSources.length === 0) {
      return this.renderNoSources()
    }
    return (
      <Table hover className="data-sources">
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Sync</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { dataSources && dataSources.map(this.renderItem) }
        </tbody>
      </Table>
    )
  }
}

function mapState (state, props) {
  const dataSources = state.dataSources[props.projectId]
  return { dataSources }
}

const actionCreators = {
  deleteDataSource,
  fetchDataSources
}

export default connect(mapState, actionCreators)(DataSourcesList)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { ShieldIcon } from '@primer/octicons-react'
import { PROJECT_TYPE } from '../../config/propTypes'
import fetchProjects from '../../actions/projects/fetchProjects'
import deleteProject from './../../actions/projects/deleteProject.action'
import NeedRecoveryButton from './recovery/NeedRecoveryButton'

class ProjectsList extends React.Component {

  static propTypes = {
    projects: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      list: PropTypes.arrayOf(PROJECT_TYPE).isRequired
    }),
    fetchProjects: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount () {
    this.props.fetchProjects()
  }

  renderFetching () {
    return (<div align="center">loading...</div>)
  }

  handleDelete (projectId) {
    this.props.deleteProject({ projectId })
  }

  renderItem (item) {
    return (
      <tr key={item.id}>
        <td><Link to={`/projects/${item.id}`}>{ item.name }</Link></td>
        <td>{ new Date(item.updatedAt).toLocaleString() }</td>
        <td>
          <Button variant="link" className="text-danger"
            onClick={ this.handleDelete.bind(this, item.id) }>
            delete
          </Button>
          { item.needsRecovery && (
            <NeedRecoveryButton showText />
          )}
        </td>
      </tr>
    )
  }

  renderList () {
    return (
      <Table hover className="projects">
        <thead>
          <tr>
            <th>name</th>
            <th>last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.props.projects.list.map(this.renderItem) }
        </tbody>
      </Table>
    )
  }

  render () {
    const { projects } = this.props
    if (projects.fetching) {
      return this.renderFetching()
    }
    if (projects.list.length === 0) {
      return (<div>No projects</div>)
    }
    return this.renderList()
  }
}

function mapState (state) {
  const { projects } = state
  return { projects }
}

const actionCreators = {
  fetchProjects,
  deleteProject
}

export default connect(mapState, actionCreators)(ProjectsList)

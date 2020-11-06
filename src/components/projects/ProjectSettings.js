import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  PlusIcon, KeyIcon, PeopleIcon, ListUnorderedIcon, ToolsIcon,
  SyncIcon, PackageDependenciesIcon, PackageDependentsIcon
} from '@primer/octicons-react'
import DataSourcesList from './DataSourcesList'
import KeyTest from './KeyTest'
import RecoveryKeyModal from './../RecoveryKeyModal'
import ProjectPageWrapper from './ProjectPageWrapper'
import EmptyState from './../lib/EmptyState'
import InviteForm from './InviteForm'
import ProjectSyncSettings from './ProjectSyncSettings'

const menu = [
  {
    link: 'general',
    label: 'Geneal',
    icon: ToolsIcon
  },
  {
    link: 'data_sources',
    label: 'Data Sources',
    icon: ListUnorderedIcon
  },
  {
    link: 'collaborators',
    label: 'Collaborators',
    icon: PeopleIcon
  },
  {
    link: 'security',
    label: 'Security',
    icon: KeyIcon
  },
  {
    link: 'sync',
    label: 'Sync',
    icon: SyncIcon
  }
]

class ProjectSettings extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    section: PropTypes.oneOf(menu.map((m) => m.link))
  }

  renderMenu () {
    const { projectId } = this.props
    const section = this.props.section || menu[0].link
    return (
      <ul className="nav flex-column settings-nav">
        { menu.map((m) => (
          <li key={m.link} className="nav-item">
            <Link to={`/projects/${projectId}/settings/${m.link}`}
              className={`nav-link ${section === m.link ? 'active' : ''} btn-wide`}>
              { React.createElement(m.icon) }
              { m.label }
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderDataSources () {
    const { projectId } = this.props
    return (
      <div className="nav-tabs-container">
        <div style={{ marginLeft: 'auto', marginBottom: '1em' }}>
          <Link className="btn-link-icon" to={`/projects/${projectId}/new_source`}>
            <PlusIcon className="mr-2" />
            Add a data source
          </Link>
        </div>
        <DataSourcesList projectId={ projectId } />
      </div>
    )
  }

  renderSection () {
    const { projectId } = this.props
    switch (this.props.section) {
      case 'data_sources':
        return this.renderDataSources()
      case 'collaborators':
        return (<InviteForm projectId={projectId} />)
      case 'security':
        return (<RecoveryKeyModal projectId={projectId} />)
      case 'sync':
        return (<ProjectSyncSettings projectId={projectId} />)
      default:
        return (<EmptyState noBorder text="COMING SOON" />)
    }
  }

  render () {
    const { projectId } = this.props
    return (
      <ProjectPageWrapper projectId={ projectId } active="Settings">
        <div className="row p-0">
          <div className="row-left border-right v-nav-wrapper">
            { this.renderMenu() }
          </div>
          <div className="row-body flex-column">
            { this.renderSection() }
            {/* <KeyTest id={projectId} /> */}
          </div>
        </div>
      </ProjectPageWrapper>
    )
  }
}

export default ProjectSettings

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  GearIcon, HistoryIcon, ListUnorderedIcon, InsightsIcon
} from '@primer/octicons-react'

function getUrl (projectId, menu = null) {
  return `/projects/${projectId}${menu ? '/' + menu : ''}`
}

export default class ProjectMenu extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    active: PropTypes.string
  }

  static defaultProps = {
    active: 'Overview'
  }

  renderIcon (name) {
    switch (name) {
      case 'Settings':
        return <GearIcon />
      case 'History':
        return <HistoryIcon />
      case 'Data':
        return <ListUnorderedIcon />
      case 'Overview':
        return <InsightsIcon />
      default:
        return null
    }
  }

  renderNavItem (name, to = getUrl(this.props.projectId)) {
    const { active } = this.props
    const klass = active === name ? 'active' : ''
    return (
      <li className="nav-item">
        <Link className={`nav-link ${klass}`} style={{fontVariant: 'small-caps'}} to={ to }>
          { this.renderIcon(name) }{ name }
        </Link>
      </li>
    )
  }

  render () {
    const { projectId } = this.props
    return (
      <ul className="nav nav-tabs nav-justified">
        { this.renderNavItem('Overview', getUrl(projectId)) }
        { this.renderNavItem('Data', getUrl(projectId, 'data')) }
        { this.renderNavItem('History', getUrl(projectId, 'history')) }
        { this.renderNavItem('Settings', getUrl(projectId, 'settings')) }
      </ul>
    )
  }
}

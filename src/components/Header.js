import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import logo from './../assets/logo.svg'
import logoutAction from './../actions/logout.action'
import { USER_TYPE } from './../config/propTypes'

class Header extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    user: USER_TYPE,
    logoutAction: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout (e) {
    e.preventDefault()
    this.props.logoutAction()
  }

  renderMenu () {
    const { user } = this.props
    return (
      <nav className="nav">
        <Link to="/dashboard" className="nav-item nav-link">
          Home
        </Link>
        <Link to="/settings" className="nav-item nav-link">
          <Gravatar email={user.email} size={20} alt="profile picture" />&nbsp;{user.firstName || 'Settings'}
        </Link>
        <a href="/logout" className="text-muted nav-item nav-link" onClick={this.onLogout}>Logout</a>
      </nav>
    )
  }

  render () {
    const loggedIn = this.props.user != null
    const klass = loggedIn ? 'internal' : 'external'
    const link = loggedIn ? '/dashboard' : '/'
    return (
      <header className={ klass }>
        <div className="header-wrapper container">
          <div id="logo">
            <Link to={ link } title="Stash Research - Alpha Version">
              <img src={ logo } alt="Stash Research logo" />
              <span id="version-alpha" className="text-danger">
                ALPHA{ process.env.REACT_APP_GIT_REV && `-${process.env.REACT_APP_GIT_REV}` }
              </span>
            </Link>
          </div>
          { loggedIn && this.renderMenu() }
        </div>
      </header>
    )
  }
}

function mapState (state) {
  const { session: { token, user } } = state
  return { token, user }
}

const actionCreators = {
  logoutAction
}

export default connect(mapState, actionCreators)(Header)

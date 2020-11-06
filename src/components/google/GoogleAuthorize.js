import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleApi from '../../lib/GoogleApi'
import { GOOGLE_API_CONFIG_TYPE } from '../../config/propTypes'
import fetchCredentials from './../../actions/users/fetchCredentials.action'
import setTokenError from '../../actions/googleApi/setTokenError.action'

const fetchGoogleCredentials = fetchCredentials.bind(null, { provider: 'google' })
/**
 * Wrapper component to use google API OAuth
 * requires Context @see GoogleApiProvider
 * once accessToken is Ready renders children
 * if auth fails, children will not be rendered
 */
class GoogleAuthorize extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    config: GOOGLE_API_CONFIG_TYPE.isRequired,
    // redux
    accessToken: PropTypes.string,
    tokenError: PropTypes.string,
    fetchingToken: PropTypes.bool.isRequired,
    state: PropTypes.string.isRequired,
    fetchGoogleCredentials: PropTypes.func.isRequired,
    setTokenError: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    this.props.fetchGoogleCredentials()
  }

  /**
   * Authorize request to google API
   * @param {function} callback
   */
  authorize (callback) {
    const { clientId, scope, redirectUri } = this.props.config
    const { state } = this.props
    GoogleApi.authorize({
      clientId,
      scope,
      state,
      redirectUri,
      responseType: 'code',
      accessType: 'offline'
    }, callback)
  }

  onClick () {
    this.authorize(async (response) => {
      console.info('gapi authorize', response)
      if (response.error) {
        this.props.setTokenError({ error: response.error.toString() })
      } else {
        this.props.fetchGoogleCredentials()
      }
    })
  }

  renderError () {
    return (
      <span className="badge badge-pill badge-warning">
        { JSON.stringify(this.props.tokenError) }
        <button className="btn btn-link" onClick={this.onClick}>
          try again
        </button>
      </span>
    )
  }

  renderFetching () {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  renderAuthorize () {
    return (
      <button className="btn btn-link" onClick={this.onClick}>
        Link your Google account
      </button>
    )
  }

  render () {
    if (this.props.tokenError != null) {
      return this.renderError()
    } else if (this.props.fetchingToken) {
      return this.renderFetching()
    } else if (this.props.accessToken == null) {
      return this.renderAuthorize()
    } else {
      return this.props.children
    }
  }
}

function mapState (state) {
  const {
    credentials: { google: { accessToken, fetching, error } },
    session: { token }
  } = state
  return { accessToken, tokenError: error, fetchingToken: fetching, state: token }
}

const actionCreators = {
  fetchGoogleCredentials,
  setTokenError
}

export default connect(mapState, actionCreators)(GoogleAuthorize)

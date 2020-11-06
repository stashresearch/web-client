import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GOOGLE_API_TYPE, GOOGLE_API_CONFIG_TYPE } from '../../config/propTypes'
import setApiLoading from '../../actions/googleApi/setApiLoading.action'
import setApiLoaded from '../../actions/googleApi/setApiLoaded.action'
import setApiLoadError from '../../actions/googleApi/setApiLoadError.action'
import GoogleApi from '../../lib/GoogleApi'

/**
 * Provide a react Context to allow usage of google JS API
 */
class GoogleApiProvider extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    googleApi: GOOGLE_API_TYPE.isRequired,
    setApiLoading: PropTypes.func.isRequired,
    setApiLoaded: PropTypes.func.isRequired,
    setApiLoadError: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.setApiLoading({ loading: true })
    GoogleApi.load((error) => {
      if (error) {
        this.props.setApiLoadError('Failed to load Google Api')
      } else {
        this.props.setApiLoaded()
      }
    })
  }

  renderError () {
    return (
      <span className="badge badge-pill badge-warning">
        { this.props.googleApi.apiLoadError }
      </span>
    )
  }

  renderApiNotReady () {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  render () {
    const { googleApi } = this.props
    if (googleApi.apiLoadError) {
      return this.renderError()
    } else if (!googleApi.apiLoaded) {
      return this.renderApiNotReady()
    } else {
      return (
        this.props.children
      )
    }
  }
}

function mapState (state) {
  const { googleApi } = state
  return { googleApi }
}

const actionCreators = {
  setApiLoading,
  setApiLoaded,
  setApiLoadError
}

export default connect(mapState, actionCreators)(GoogleApiProvider)

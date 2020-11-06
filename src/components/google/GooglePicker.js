import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { GOOGLE_API_CONFIG_TYPE } from '../../config/propTypes'

class GooglePicker extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    config: GOOGLE_API_CONFIG_TYPE.isRequired,
    accessToken: PropTypes.string.isRequired,
    // picker options
    viewId: PropTypes.string,
    origin: PropTypes.string,
    createPicker: PropTypes.func,
    multiselect: PropTypes.bool,
    navHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    mimeTypes: PropTypes.arrayOf(PropTypes.string),
    query: PropTypes.string,
    autoShow: PropTypes.bool,
    onPicked: PropTypes.func
  }

  static defaultProps = {
    viewId: 'DOCS',
    multiselect: false,
    navHidden: false,
    disabled: false,
    autoShow: false,
    onPicked: function () {}
  }

  constructor (props) {
    super(props)
    this.state = {
      filePicked: null,
      showPicker: props.autoShow
    }
    this.onPickerAction = this.onPickerAction.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ showPicker: true })
  }

  onPickerAction ({ action, docs }) {
    console.log(action)
    if (action === window.google.picker.Action.CANCEL) {
      this.setState({ showPicker: false })
    } else if (docs != null && Array.isArray(docs) && docs.length > 0) {
      this.setState({ filePicked: docs[0], showPicker: false })
      this.props.onPicked(docs[0])
    }
  }

  setupPickerView () {
    const googleViewId = window.google.picker.ViewId[this.props.viewId]
    const view = new window.google.picker.View(googleViewId)
    if (this.props.mimeTypes) {
      view.setMimeTypes(this.props.mimeTypes.join(','))
    }
    if (this.props.query) {
      view.setQuery(this.props.query)
    }
    if (!view) {
      this.setState({ error: 'Can\'t find view by viewId' })
      // throw new Error('Can\'t find view by viewId')
    }
    return view
  }

  /**
   * render google picker
   * google api should be loaded (this.state.googleApiReady)
   * && accessToken should exists (this.props.googleApi.accessToken)
   */
  renderPicker () {
    if (this.props.createPicker) {
      return this.props.createPicker(
        window.google, this.props.accessToken
      )
    }
    const view = this.setupPickerView()
    const picker = new window.google.picker.PickerBuilder()
      .setAppId(this.props.config.clientId.split('-')[0])
      .addView(view)
      .setLocale('en')
      .setOrigin(window.location.protocol + '//' + window.location.host)
      .setOAuthToken(this.props.accessToken)
      .setDeveloperKey(this.props.config.developerKey)
      .setCallback(this.onPickerAction)

    if (this.props.origin) {
      picker.setOrigin(this.props.origin)
    }

    if (this.props.navHidden) {
      picker.enableFeature(window.google.picker.Feature.NAV_HIDDEN)
    }

    if (this.props.multiselect) {
      picker.enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
    }

    picker.build()
      .setVisible(true)
    return (
      <Button variant="link" disabled>
        Picking file...
      </Button>
    )
  }

  renderError () {
    return (
      <span className="badge badge-pill badge-warning">
        { this.state.error }
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
    if (this.state.error) {
      return this.renderError()
    } else if (this.state.showPicker) {
      return this.renderPicker()
    }
    return (
      <div onClick={this.onClick} style={{display: 'flex', alignSelf: 'flex-start'}}>
        {
          this.props.children ? this.props.children : (
            <button>Open Google Picker</button>
          )
        }
      </div>
    )
  }
}

function mapState (state) {
  const { credentials: { google: { accessToken } } } = state
  return { accessToken }
}

const actionCreators = {
}

export default connect(mapState, actionCreators)(GooglePicker)

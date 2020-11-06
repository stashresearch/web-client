import React from 'react'
import PropTypes from 'prop-types'
import Api from './../ApiV2'

export default class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

  constructor (props) {
    super(props)
    this.state = { error: null, reportId: null }
  }

  static getDerivedStateFromError (e) {
    return { error: e }
  }

  componentDidCatch (error, info) {
    Api.post('/errors', { error, info }).then((res) => {
      this.setState({ reportId: res.id })
    })
  }

  renderError () {
    return (
      <div className="crash-report">
        <div className="container">
          <h3>Something went wrong.</h3>
          <div className="text-muted">
            <a href="#" onClick={() => window.location.reload()}>Reload</a> or go back to <a href="/">Home page</a>
          </div>
          <div className="text-muted">
            { this.state.reportId ? `Error reported, ref: ${this.state.reportId}` : 'Sending error report...'}
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.error != null) {
      return this.renderError()
    }
    return this.props.children
  }

}

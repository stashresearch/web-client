import React from 'react'
import { APP_TITLE } from './../config/'
import Header from './../components/Header'
import ErrorBoundary from './../lib/ErrorBoundary'

export default class Screen extends React.Component {

  static title = APP_TITLE

  componentDidMount () {
    const { title } = this.constructor
    document.title = title === APP_TITLE ? title : `${title} - ${APP_TITLE}`
  }

  renderScreen () {
    return (<div></div>)
  }

  render () {
    return (
      <div className={`screen ${this.constructor.title}`}>
        { this.renderScreen() }
      </div>
    )
  }
}

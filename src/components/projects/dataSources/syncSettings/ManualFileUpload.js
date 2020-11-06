import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import putDataSourceData from './../../../../actions/projects/dataSources/putDataSourceData.action'
import Dropzone from './../../../lib/Dropzone'
import parseCsvUpload from './../../../../lib/parseCsvUpload'
import UpdateCsvDs from './../UpdateCsvDs'

export default class ManualFileUpload extends React.Component {

  static propTypes = {
    dataSourceId: PropTypes.string.isRequired,
    sourceName: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.state = { parsed: null }
  }

  onFilesAdded (file) {
    parseCsvUpload(file).then((parsed) => {
      this.setState({ parsed })
    }).catch(console.error)
  }

  onSent () {
    console.log('sent!!')
  }

  renderDropdown () {
    return (
      <Dropzone onFilesAdded={ this.onFilesAdded }
        text="Drag & Drop your CSV file here" accept=".csv,text/csv" />
    )
  }

  renderUpdateCsv () {
    return (
      <div className="manual-sync-update">
        <UpdateCsvDs dataSourceId={ this.props.dataSourceId }
          parsedCsv={ this.state.parsed } onSent={ this.onSent } />
      </div>
    )
  }

  render () {
    const { sourceName } = this.props
    return (
      <div className="manual-sync">
        <h5>Manual Sync</h5>
        <p>
          Manually upload your data again, original file name: <strong>{sourceName}</strong>
        </p>
        { this.state.parsed == null && this.renderDropdown() }
        { this.state.parsed != null && this.renderUpdateCsv() }
      </div>
    )
  }
}

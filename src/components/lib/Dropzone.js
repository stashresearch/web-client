import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UploadIcon } from '@primer/octicons-react'
import './../../assets/dropzone.css'

class Dropzone extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    directory: PropTypes.bool,
    accept: PropTypes.string,
    text: PropTypes.string,
    onFilesAdded: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    multiple: false,
    directory: false,
    accept: '',
    text: 'Drag & Drop your files here',
    onFilesAdded: function () {}
  }

  constructor (props) {
    super(props)
    this.state = { hightlight: false }
    this.fileInputRef = React.createRef()

    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  openFileDialog () {
    if (this.props.disabled) { return }
    this.fileInputRef.current.click()
  }

  onFilesAdded (evt) {
    if (this.props.disabled) return
    const files = evt.target.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(this.props.multiple || this.props.directory ? array : array[0])
    }
  }

  onDragOver (evt) {
    evt.preventDefault()

    if (this.props.disabled) { return }

    this.setState({ hightlight: true })
  }

  onDragLeave () {
    this.setState({ hightlight: false })
  }

  onDrop (event) {
    event.preventDefault()
    if (this.props.disabled) { return }

    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(this.props.multiple || this.props.directory ? array : array[0])
    }
    this.setState({ hightlight: false })
  }

  fileListToArray (list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  render () {
    return (
      <div
        className={`Dropzone mt-2 mb-2 ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple={ this.props.multiple || this.props.directory }
          onChange={this.onFilesAdded}
          accept={ this.props.accept }
          webkitdirectory={ this.props.directory ? '' : undefined }
          mozdirectory={ this.props.directory ? '' : undefined }
        />
        <UploadIcon size="large" />
        <span>{ this.props.text }</span>
        <span>or <u><strong>browse your files</strong></u></span>
      </div>
    )
  }
}

export default Dropzone

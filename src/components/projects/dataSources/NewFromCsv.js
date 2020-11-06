import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import { Alert } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import Dropzone from './../../lib/Dropzone'
import BootstrapField from '../../lib/formik/BootstrapField'
import BootstrapSubmitButton from '../../lib/formik/BootstrapSubmitButton'
import createDataSource from './../../../actions/projects/createDataSource.action'
import { CSV_PARSED } from './../../../config/const'
import parseCsvUpload from './../../../lib/parseCsvUpload'

class NewFromCsv extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    createDataSource: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      parsed: null
    }
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (values, bag) {
    console.log(values)
    this.props.createDataSource(values)
  }

  onFilesAdded (file) {
    console.log(file)
    parseCsvUpload(file).then((parsed) => {
      this.setState({ parsed, error: null })
    }).catch((e) => {
      this.setState({ error: e.message })
    })
  }

  renderDropzone () {
    return (
      <Dropzone onFilesAdded={ this.onFilesAdded }
        text="Drag & Drop your CSV file here" accept=".csv,text/csv" />
    )
  }

  renderError () {
    if (Array.isArray(this.state.error)) {
      return (
        <Alert variant="danger">
          <ul>
            {
              this.state.error.map((e, i) => {
                return (<li key={i}>{ e }</li>)
              })
            }
          </ul>
        </Alert>
      )
    } else if (this.state.error) {
      return (
        <Alert variant="danger">
          { this.state.error }
        </Alert>
      )
    }
    return null
  }

  renderForm () {
    const initialValues = {
      sourceName: this.state.parsed.sourceName,
      name: '',
      provider: 'fileUpload',
      projectId: this.props.projectId,
      columnNames: this.state.parsed.meta.fields,
      extraData: this.state.parsed
    }
    return (
      <Formik initialValues={ initialValues }
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={this.onSubmit} >
        <Form>
          <Alert variant="info">
            columns found: {this.state.parsed.meta.fields.join(', ')}
          </Alert>
          <BootstrapField name="sourceName" type="hidden" />
          <BootstrapField label="File label (on Stash Research)" name="name" />
          <BootstrapSubmitButton caps label="create data source" />
        </Form>
      </Formik>
    )
  }

  render () {
    return (
      <div>
        { this.renderError() }
        { this.state.parsed ? this.renderForm() : this.renderDropzone() }
      </div>
    )
  }
}

function mapState (state) {
  return {}
}

const actionCreators = {
  createDataSource
}

export default connect(mapState, actionCreators)(NewFromCsv)

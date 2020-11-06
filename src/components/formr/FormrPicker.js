import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import alterFormrSourceForm from './../../actions/formr/alterFormrSourceForm.action'
import createDataSource from './../../actions/projects/createDataSource.action'

class FormrPicker extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    form: PropTypes.shape({
      sourceSurveyName: PropTypes.string.isRequired,
      sourceName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    newDataSource: PropTypes.shape({
      sending: PropTypes.bool.isRequired,
      error: PropTypes.any
    }),
    alterFormrSourceForm: PropTypes.func.isRequired,
    createDataSource: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.props.alterFormrSourceForm({ name, value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { sourceName, sourceSurveyName, name } = this.props.form
    this.props.createDataSource({
      provider: 'formr',
      projectId: this.props.projectId,
      sourceName,
      sourceSurveyName,
      name
    })
  }

  render () {
    const { newDataSource } = this.props
    const { sourceName, sourceSurveyName, name } = this.props.form
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Group controlId="sourceName">
          <Form.Label>Run Name*</Form.Label>
          <Form.Text className="text-muted">Name of the run on FormR</Form.Text>
          <Form.Control type="text" name="sourceName"
            placeholder="Enter formr run name..." value={ sourceName }
            onChange={ this.handleChange } />
        </Form.Group>
        <Form.Group controlId="sourceSurveyName">
          <Form.Label>Survey Name*</Form.Label>
          <Form.Text className="text-muted">Name of the survey on FormR</Form.Text>
          <Form.Control type="text" name="sourceSurveyName"
            placeholder="Enter formr survey name..." value={ sourceSurveyName }
            onChange={ this.handleChange } />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Label <span className="text-muted small">(optional)</span></Form.Label>
          <Form.Text className="text-muted">Name of the data source on StashResearch</Form.Text>
          <Form.Control type="text" name="name"
            placeholder="Enter label..." value={ name }
            onChange={ this.handleChange } />
        </Form.Group>
        <div align="right">
          <Button variant="primary" type="submit" disabled={newDataSource.sending}>
            { newDataSource.sending ? 'Submitting...' : 'Submit' }
          </Button>
        </div>
      </Form>
    )
  }
}

function mapState (state) {
  const { formr: { newDataSourceForm }, projects: { newDataSource } } = state
  return { form: newDataSourceForm, newDataSource }
}

const actionCreators = {
  alterFormrSourceForm,
  createDataSource
}

export default connect(mapState, actionCreators)(FormrPicker)

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Formik, Field, ErrorMessage } from 'formik'
import history from './../../history'
import alterProjectNewForm from '../../actions/projects/alterProjectNewForm.action'
import createProject from '../../actions/projects/createProject.action'
import BootstrapField from '../lib/formik/BootstrapField'

class ProjectNewForm extends React.Component {

  static propTypes = {
    form: PropTypes.shape({
      name: PropTypes.string.isRequired,
      access: PropTypes.oneOf(['public', 'private']),
      description: PropTypes.string,
      sending: PropTypes.bool.isRequired,
      success: PropTypes.bool.isRequired,
      errors: PropTypes.array.isRequired,
      created: PropTypes.string
    }).isRequired,
    alterProjectNewForm: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormikSubmit = this.handleFormikSubmit.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.form.success === true && prevProps.form.success === false) {
      // history.goBack()
    }
  }

  handleChange (e) {
    const { name, value } = e.target
    this.props.alterProjectNewForm(name, value)
  }

  handleAccessChange (e) {
    console.log(e.target.name, e.target.value)
  }

  handleSubmit (e) {
    e.preventDefault()
    const { name, access, description } = this.props.form
    this.props.createProject({ name, access, description })
    return null
  }

  renderError () {
    if (this.props.form.errors.length > 0) {
      const msg = this.props.form.errors
        .filter(e => e.field === null)
        .map(e => e.message)
        .join(' ; ')
      if (msg) {
        return (
          <Alert variant="danger">{ msg }</Alert>
        )
      }
    }
  }

  renderFieldError (field) {
    const error = this.props.form.errors.filter(e => e.field === field)
    if (error.length > 0) {
      return (
        <Form.Text className="text-danger">
          { error[0].message }
        </Form.Text>
      )
    }
  }

  async handleFormikSubmit (values, formik) {
    const { name, access, description } = values
    console.log(name, access, description)
    try {
      await this.props.createProject({ name, access, description })
      if (this.props.form.success) {
        formik.setSubmitting(false)
        console.log(this.props.form.created)
        history.push(`/projects/${this.props.form.created}/setup`)
      } else {
        const errors = {}
        this.props.form.errors.forEach((err) => {
          errors[err.field] = err.message
        })
        formik.setErrors(errors)
      }
    } catch (e) {
      console.log('err', e)
      // TODO something went wrong
    }
    return false
  }

  renderForm (formik) {
    const publicChecked = formik.values.access === 'public'
    const privateChecked = formik.values.access === 'private'
    return (
      <Form onSubmit={formik.handleSubmit} className="needs-validation">
        <h4>Project Creation</h4>
        <BootstrapField name="name" type="text" label="Project name"
          placeholder="Enter project name..." autofocus />
        <BootstrapField name="description" type="text" label="Project Description"
          placeholder="Enter project description..."
          description="Describe your project in a few words" />
        <label>Project access</label>
        <Form.Group>
          <div className="radio-group">
            <Form.Check type="radio" name="access" id="access-public" className={publicChecked ? 'checked' : ''}
              label="Public" value="public" checked={ publicChecked }
              onChange={formik.handleChange} />
            <Form.Check type="radio" name="access" id="access-private" className={privateChecked ? 'checked' : ''}
              label="Private" value="private" checked={ privateChecked }
              onChange={formik.handleChange} />
          </div>
          <small className="form-text text-muted">Public projects data will be readable by everyone, private project data will only be available to collaborators.</small>
        </Form.Group>
        <div align="right">
          <Button variant="primary" className="btn-wide" type="submit" disabled={ formik.isSubmitting }>
            { formik.isSubmitting ? 'sending...' : 'Create'}
          </Button>
        </div>
      </Form>
    )
  }

  render () {
    const initialValues = {
      name: '',
      access: 'public',
      description: ''
    }
    return (
      <Formik initialValues={initialValues}
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={this.handleFormikSubmit}
        render={this.renderForm} />
    )
  }

}

function mapState (state) {
  const { projects: { formNew } } = state
  return { form: formNew }
}

const actionCreators = {
  alterProjectNewForm,
  createProject
}

export default connect(mapState, actionCreators)(ProjectNewForm)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { KeyIcon } from '@primer/octicons-react'
import { USER_TYPE } from './../config/propTypes'

class SettingsForm extends React.Component {

  static propTypes = {
    user: USER_TYPE.isRequired
  }

  handleChange () {}

  renderFieldError () {}

  renderInput (field, type = 'text') {
    const value = this.props.user[field]
    return (
      <Form.Group controlId={ field }>
        <Form.Label>{ field }</Form.Label>
        <Form.Control type={ type } name={ field }
          placeholder={`Enter ${field}...`} value={ value }
          disabled
          onChange={ this.handleChange } />
        { this.renderFieldError(field) }
      </Form.Group>
    )
  }

  render () {
    return (
      <Form>
        { this.renderInput('email', 'email') }
        { this.renderInput('firstName') }
        { this.renderInput('lastName') }
        <Link className="btn-link-icon text-danger" to="/reset_password">
          <KeyIcon className="mr-2" />
          change password
        </Link>
      </Form>
    )
  }
}

function mapState (state) {
  const { session: { user } } = state
  return { user }
}

const actionCreators = {}

export default connect(mapState, actionCreators)(SettingsForm)

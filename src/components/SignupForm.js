import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from './../history'
import alterSignupForm from './../actions/alterSignupForm.action'
import register from './../actions/register.action'
import { USER_TYPE } from './../config/propTypes'

class SignupForm extends React.Component {

  static propTypes = {
    registration: PropTypes.shape({
      form: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
      }),
      registering: PropTypes.bool,
      register: PropTypes.any,
      errors: PropTypes.array
    }).isRequired,
    token: PropTypes.string,
    user: USER_TYPE,
    alterSignupForm: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.props.alterSignupForm(name, value)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.register(this.props.registration.form)
  }

  componentDidUpdate (prevProps) {
    if (this.props.user != null && prevProps.user == null) {
      history.push('/dashboard')
    }
  }

  renderError (field) {
    const error = this.props.registration.errors.filter(e => e.field === field)
    if (error.length > 0) {
      return (
        <Form.Text className="text-danger">
          { error[0].message }
        </Form.Text>
      )
    }
  }

  renderSuccess () {
    return (
      <div>
        Your account was created, You can now&nbsp;
        <Link to="/login">Login</Link>
      </div>
    )
  }

  render () {
    const {
      form: {
        email, password, firstName, lastName
      }, registering, register
    } = this.props.registration
    if (register.status === 'success') {
      return this.renderSuccess()
    }
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email"
            placeholder="Enter email..." value={ email }
            onChange={ this.handleChange } />
          { this.renderError('email') }
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password"
            placeholder="Enter password..." value={ password }
            onChange={ this.handleChange } />
          { this.renderError('password') }
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName"
            placeholder="First Name..." value={ firstName }
            onChange={ this.handleChange } />
          { this.renderError('firstName') }
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName"
            placeholder="Last Name..." value={ lastName }
            onChange={ this.handleChange } />
          { this.renderError('lastName') }
        </Form.Group>
        <div align="righ">
          <Button variant="primary" type="submit" disabled={ registering }>
            { registering ? 'Registering...' : 'Submit'}
          </Button>
        </div>
      </Form>
    )
  }
}

function mapState (state) {
  const { registration, session: { token, user } } = state
  return { registration, token, user }
}

const actionCreators = {
  alterSignupForm,
  register
}

export default connect(mapState, actionCreators)(SignupForm)

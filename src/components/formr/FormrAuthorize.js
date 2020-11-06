import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Loading from './../Loading'
import alterFormrAuthForm from './../../actions/formr/alterFormrAuthForm.action'
import fetchCredentials from '../../actions/users/fetchCredentials.action'
import setCredentials from './../../actions/setCredentials.action'

class FormrAuthorize extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    formr: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      accessToken: PropTypes.string,
      error: PropTypes.any
    }),
    authorizeForm: PropTypes.shape({
      clientId: PropTypes.string.isRequired,
      clientSecret: PropTypes.string.isRequired
    }).isRequired,
    alterFormrAuthForm: PropTypes.func.isRequired,
    fetchCredentials: PropTypes.func.isRequired,
    setCredentials: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { formr: { fetching, accessToken } } = this.props
    if (!fetching && accessToken == null) {
      this.props.fetchCredentials({ provider: 'formr' })
    }
  }

  handleChange (e) {
    const { name, value } = e.target
    this.props.alterFormrAuthForm({ name, value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { clientId, clientSecret } = this.props.authorizeForm
    this.props.setCredentials({
      provider: 'formr',
      clientId,
      clientSecret
    })
  }

  renderError () {
    return (
      <span className="badge badge-pill badge-warning">
        { this.props.formr.error }
      </span>
    )
  }

  renderAuthorizeForm () {
    const { clientId, clientSecret } = this.props.authorizeForm
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Group controlId="clientId">
          <Form.Label>Client ID</Form.Label>
          <Form.Control type="text" name="clientId"
            placeholder="Enter client ID..." value={ clientId }
            onChange={ this.handleChange } />
        </Form.Group>
        <Form.Group controlId="clientSecret">
          <Form.Label>Client Secret</Form.Label>
          <Form.Control type="text" name="clientSecret"
            placeholder="Enter client secret..." value={ clientSecret }
            onChange={ this.handleChange } />
        </Form.Group>
        <div align="right">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    )
  }

  render () {
    const { formr } = this.props
    if (formr.error != null) {
      return this.renderError()
    } else if (formr.fetching) {
      return <Loading />
    } else if (formr.accessToken == null) {
      return this.renderAuthorizeForm()
    } else {
      return this.props.children
    }
  }
}

function mapState (state) {
  const { credentials: { formr }, formr: { authorizeForm } } = state
  return { formr, authorizeForm }
}

const actionCreators = {
  alterFormrAuthForm,
  fetchCredentials,
  setCredentials
}

export default connect(mapState, actionCreators)(FormrAuthorize)

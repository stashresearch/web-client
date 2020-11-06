import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { Table, Button } from 'react-bootstrap'
import { ShieldLockIcon, CircleSlashIcon } from '@primer/octicons-react'
import { DATA_SOURCE_TYPE } from './../../../config/propTypes'
import history from './../../../history'
import fetchDataSource from './../../../actions/projects/dataSources/fetchDataSource.action'
import setupDataSource from './../../../actions/projects/dataSources/setupDataSource.action'
import Loading from './../../Loading'
import BootstrapCheck from '../../lib/formik/BootstrapCheck'
import BootstrapRadio from '../../lib/formik/BootstrapRadio'
import BootstrapSubmitButton from '../../lib/formik/BootstrapSubmitButton'

class DataSourceSetupForm extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dataSource: DATA_SOURCE_TYPE,
    form: PropTypes.shape({
      success: PropTypes.bool,
      error: PropTypes.any
    }).isRequired,
    newDataSource: PropTypes.any,
    fetchDataSource: PropTypes.func.isRequired,
    setupDataSource: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  componentDidMount () {
    if (this.props.dataSource == null) {
      this.props.fetchDataSource(this.props.id)
    }
  }

  async handleSubmit (values, bag) {
    console.log(values)
    await this.props.setupDataSource({
      id: this.props.id,
      ...values
    })
    if (this.props.form.success) {
      const { newDataSource, id } = this.props
      if (newDataSource && newDataSource.created === id && newDataSource.extraData) {
        history.push(`/dataSources/${id}/csv_setup`)
      } else {
        history.push(`/projects/${this.props.dataSource.projectId}/settings`)
      }
    } else {
      bag.setSubmitting(false)
      console.error(this.props.form.error)
      // TODO display error
    }
    return false
  }

  onClearKey (formik) {
    formik.setFieldValue('key', '')
  }

  renderColumn (column, i) {
    return (
      <tr key={i}>
        <td>{ column.name }</td>
        <td>
          <BootstrapCheck label={<ShieldLockIcon />}
            name="personalData" value={column.id} id={`personal-${column.id}`} />
        </td>
        <td>
          <BootstrapCheck label={<CircleSlashIcon />}
            name="omit" value={column.id} id={`omit-${column.id}`} />
        </td>
        <td>
          <BootstrapRadio label=""
            name="key" value={column.id}
            id={`key-${column.id}`} />
        </td>
      </tr>
    )
  }

  renderForm (formik) {
    const { dataSource } = this.props
    return (
      <Form>
        <Table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Personal Data</th>
              <th>Omit</th>
              <th>
                Observation key&nbsp;
                { formik.values.key !== '' && (
                  <small className="text-danger"
                    onClick={() => this.onClearKey(formik)}>
                    clear
                  </small>
                ) }
              </th>
            </tr>
          </thead>
          <tbody>
            { dataSource.columns.map(this.renderColumn) }
          </tbody>
        </Table>
        <div align="right">
          <BootstrapSubmitButton label="Submit" />
        </div>
      </Form>
    )
  }

  render () {
    const { dataSource } = this.props
    if (dataSource == null) {
      return <Loading />
    }
    return (
      <Formik handleSubmit={(e) => e.preventDefault()} onSubmit={this.handleSubmit}
        initialValues={{ personalData: [], omit: [], key: '' }}
        render={this.renderForm} />
    )
  }
}

function mapState (state, props) {
  const { dataSources } = state
  const dataSource = dataSources[props.id]
  return {
    dataSource,
    form: dataSources.setupForm,
    newDataSource: state.projects.newDataSource
  }
}

const actionCreators = {
  fetchDataSource,
  setupDataSource
}

export default connect(mapState, actionCreators)(DataSourceSetupForm)

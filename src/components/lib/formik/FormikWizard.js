import React from 'react'
import PropTypes from 'prop-types'
import isPromise from 'is-promise'
import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'
import history from '../../../history'
import { parseApiError } from '../../../lib/handleFormResponse'
import { connectFormikBag } from './ConnectFormikToRedux'
import { formState } from '../../../config'
import FormikGlobalError from './FormikGlobalError'

// TODO: previous steps
// listen to history changes
export default class FormikWizard extends React.Component {
  static Step = ({ onSubmit, path, hideSubmit = false, children }) => children

  static propTypes = {
    ...React.Component.propTypes,
    initialStatus: PropTypes.any
  }

  static defaultProps = {
    initialStatus: null
  }

  constructor (props) {
    super(props)
    const locations = React.Children.map(props.children, (el) => el.props.path)
    this.state = {
      step: Math.max(0, locations.indexOf(window.location.pathname)),
      status: props.initialStatus,
      formStates: React.Children.map(props.children, (el) => formState)
    }
    console.log(this.state)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  previous () {
    // this.props.locations[this.state.step-1]
  }

  // TODO handle reject
  async handleSubmit (values, bag) {
    const childrenArray = React.Children.toArray(this.props.children)
    const activeStep = childrenArray[this.state.step]
    const isLastStep = this.state.step === childrenArray.length - 1
    let res = activeStep.props.onSubmit(values, bag)
    if (isPromise(res)) {
      try {
        res = await res
        if (!isLastStep) {
          const next = this.state.step + 1
          const nextStep = childrenArray[next]
          bag.setSubmitting(false)
          this.setState({ step: next })
          nextStep.props.path && history.push(nextStep.props.path)
        }
      } catch (e) {
        res = null
        const check = parseApiError(this.state.formStates[this.state.step], e)
        connectFormikBag({ ...this.state.status, ...check }, bag)
        this.setState((state) => {
          state.formStates[state.step] = check
          return {
            formStates: state.formStates
          }
        })
      }
    }
    return false
  }

  renderForm (formik) {
    const childrenArray = React.Children.toArray(this.props.children)
    const activeStep = childrenArray[this.state.step]
    const isLastStep = this.state.step === childrenArray.length - 1
    const submitText = isLastStep ? 'Submit' : 'Next'
    return (
      <Form className="needs-validation">
        <FormikGlobalError />
        { activeStep }
        { !activeStep.props.hideSubmit && (
          <div align="right">
            <Button variant="primary" type="submit" disabled={ formik.isSubmitting }>
              { formik.isSubmitting ? 'sending...' : submitText}
            </Button>
          </div>
        )}
      </Form>
    )
  }

  render () {
    const childrenArray = React.Children.toArray(this.props.children)
    const activeStep = childrenArray[this.state.step]
    return (
      <Formik
        initialStatus={ this.props.initialStatus }
        initialValues={activeStep.props.initialValues || {}}
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={this.handleSubmit}
        render={this.renderForm}>
      </Formik>
    )
  }
}

FormikWizard.Step.propTypes = {
  onSubmit: PropTypes.func,
  path: PropTypes.string,
  initialValues: PropTypes.shape({})
}

FormikWizard.Step.defaultProps = {
  onSubmit: function () {},
  path: null,
  initialValues: {}
}

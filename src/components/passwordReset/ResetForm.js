import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Alert } from 'react-bootstrap'
import BootstrapField from '../lib/formik/BootstrapField'
import BootstrapSubmitButton from '../lib/formik/BootstrapSubmitButton'
import changePassword from './../../actions/users/changePassword.action'
import ConnectFormikToRedux from '../lib/formik/ConnectFormikToRedux'
import FormikGlobalError from '../lib/formik/FormikGlobalError'
import history from './../../history'
import { Link } from 'react-router-dom'

export default function ResetFormWrapper ({ resetToken, ...props }) {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const formFeedback = useSelector((state) => state.users.changePassword)

  React.useEffect(() => {
    if (user && !formFeedback.submitting && formFeedback.success) {
      history.push('/projects/recovery')
    }
  }, [formFeedback])

  const initialValues = {
    token: resetToken,
    password: '',
    passwordConfirm: ''
  }
  if (user) {
    initialValues.currentPassword = ''
  }

  async function handleSubmit (values, bag) {
    if (values.password !== values.passwordConfirm) {
      bag.setErrors({
        password: 'Password do not match',
        passwordConfirm: 'Password do not match'
      })
      bag.setSubmitting(false)
      return false
    }
    dispatch(changePassword(values))
    bag.setSubmitting(false)
  }

  if (formFeedback.success) {
    return (
      <div>
        <Alert type="info">
          Your Password has been changed!
          You can now log in with your new password
        </Alert>
        <Link to="/login" className="btn btn-primary small-caps">login</Link>
      </div>
    )
  }

  return (
    <Formik initialValues={initialValues}
      handleSubmit={(e) => e.preventDefault()}
      onSubmit={handleSubmit}>
      <Form>
        <ConnectFormikToRedux state={ formFeedback } />
        <h4 className="page-title">Change your password</h4>
        <FormikGlobalError />
        <Field type="hidden" name="token" />
        { user && (
          <BootstrapField type="password" name="currentPassword"
            label="Current password" />
        ) }
        <BootstrapField type="password" name="password" label="New password" />
        <BootstrapField type="password" name="passwordConfirm" label="Confirm new password" />
        <div align="right">
          <BootstrapSubmitButton caps label="change password" />
        </div>
      </Form>
    </Formik>
  )
}

ResetFormWrapper.propTypes = {
  resetToken: PropTypes.string.isRequired
}

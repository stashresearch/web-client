import React from 'react'
import { Formik, Form as FormikForm } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import loginAction from './../actions/login.action'
import history from './../history'
import ConnectFormikToRedux from './lib/formik/ConnectFormikToRedux'
import BootstrapField from './lib/formik/BootstrapField'
import BootstrapSubmitButton from './lib/formik/BootstrapSubmitButton'
import FormikGlobalError from './lib/formik/FormikGlobalError'

export default function Login (props) {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const formState = useSelector((state) => state.login.loginForm)

  React.useEffect(() => {
    if (user != null) {
      history.push('/dashboard')
    }
  }, [user])

  function handleSubmit (values) {
    dispatch(loginAction(values))
    return false
  }

  return (
    <Formik initialValues={{ email: '', password: '' }}
      handleSubmit={(e) => e.preventDefault()}
      onSubmit={handleSubmit}>
      <FormikForm>
        <h4 className="page-title">Login Form</h4>
        <ConnectFormikToRedux state={formState} />
        <FormikGlobalError />
        <BootstrapField name="email" type="email" label="Email" placeholder="Enter your email..." />
        <BootstrapField name="password" type="password" label="Password" placeholder="Enter your password..." />
        <Link to="/reset_password">Forgot password?</Link>
        <BootstrapSubmitButton caps label="login" submittingLabel="logging in" />
      </FormikForm>
    </Formik>
  )
}

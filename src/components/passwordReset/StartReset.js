import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { PaperAirplaneIcon } from '@primer/octicons-react'
import { Formik, Form } from 'formik'
import startResetPassword from './../../actions/users/startResetPassword.action'
import BootstrapField from '../lib/formik/BootstrapField'
import ConnectFormikToRedux from '../lib/formik/ConnectFormikToRedux'

export default function StartReset (props) {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const form = useSelector((state) => state.users.resetPassword)

  const verb = user ? 'Change' : 'Reset'

  function handleSubmit (values) {
    return dispatch(startResetPassword(values.email))
  }

  if (form.success) {
    return (
      <div>
        <h4 className="page-title">{ verb } your password</h4>
        <p>An email has been sent to you</p>
        {/* Resend / Error display */}
      </div>
    )
  }

  return (
    <div>
      <h4 className="page-title">{ verb } your password</h4>
      <p>
        To { verb.toLocaleLowerCase() } your password, we need to
        send you a confirmation email.
      </p>
      <Formik initialValues={{ email: '' }}
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={handleSubmit}>
        <Form>
          <ConnectFormikToRedux state={ form } />
          { user == null && (
            <BootstrapField label="Email" name="email" placeholder="Enter your email..." />
            // <Form.Group controlId="email">
            //   <Form.Label>Email</Form.Label>
            //   <Form.Control type="email" placeholder="Enter your email"
            //     value={ email } onChange={(e) => setEmail(e.target.value)} />
            // </Form.Group>
          ) }
          <div align="center">
            <Button variant="danger" size="lg" className="small-caps btn-wide"
              type="submit" disabled={ form.submitting }>
              send me a confirmation email
              <PaperAirplaneIcon className="ml-2" verticalAlign="middle" />
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

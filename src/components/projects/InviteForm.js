import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { PeopleIcon } from '@primer/octicons-react'
import BootstrapField from './../lib/formik/BootstrapField'
import BootstrapRadiosGroup from './../lib/formik/BootstrapRadiosGroup'
import BootstrapSubmitButton from './../lib/formik/BootstrapSubmitButton'
import ConnectFormikToRedux from './../lib/formik/ConnectFormikToRedux'
import FormikGlobalError from './../lib/formik/FormikGlobalError'
import EmptyState from './../lib/EmptyState'
import inviteMember from './../../actions/projects/inviteMember.action'

// const scopes = [
//   { label: 'Global', value: 'global' },
//   { label: 'Only theirs', value: 'local' }
// ]

const roles = [
  { label: 'Owner', value: 'owner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Researcher', value: 'researcher' },
  { label: 'Read-Only Access', value: 'viewer' }
]

const initialValues = {
  email: '', firstName: '', scope: 'global', role: 'researcher'
}

export default function InviteForm (props) {

  const dispatch = useDispatch()
  const feedback = useSelector((state) => state.projects.inviteForm)

  function onSubmit (values) {
    console.log(values)
    dispatch(inviteMember({
      projectId: props.projectId,
      ...values
    }))
  }

  return (
    <Formik handleSubmit={(e) => e.preventDefault()}
      onSubmit={onSubmit} initialValues={initialValues}>
      <Form className="flex-column">
        <EmptyState customIcon={PeopleIcon} noBorder variant="primary" text="Invite member">
          <ConnectFormikToRedux state={ feedback } />
          <FormikGlobalError />
          <BootstrapField label="Email" name="email" type="email" placeholder="Email..." />
          <BootstrapRadiosGroup label="Role" name="role" fields={roles} />
          <BootstrapSubmitButton align="right" className="mt-3" />
        </EmptyState>
      </Form>
    </Formik>
  )
}

InviteForm.propTypes = {
  projectId: PropTypes.string.isRequired
}

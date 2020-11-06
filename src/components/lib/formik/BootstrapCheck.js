import React from 'react'
import { useField } from 'formik'
import { FormCheck } from 'react-bootstrap'

function BootstrapCheck (props) {

  const [field] = useField({ ...props, type: 'checkbox' })

  return (
    <FormCheck {...field} {...props}
      className={ field.checked ? 'is-selected' : '' } />
  )
}

export default BootstrapCheck

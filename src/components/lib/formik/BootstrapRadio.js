import React from 'react'
import { useField } from 'formik'
import { FormCheck } from 'react-bootstrap'

function BootstrapRadio (props) {

  const [field] = useField({ ...props, type: 'radio' })

  return (
    <FormCheck type="radio" { ...field } { ...props }
      className={ field.checked ? 'is-selected checked' : '' } />
  )
}

export default BootstrapRadio

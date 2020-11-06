import React from 'react'
import { useFormikContext } from 'formik'
import { Alert } from 'react-bootstrap'

function FormikGlobalError () {

  const formik = useFormikContext()
  if (formik.status && formik.status.errorMsg) {
    return (
      <Alert variant="danger">
        { formik.status.errorMsg }
      </Alert>
    )
  }

  return null
}

export default FormikGlobalError

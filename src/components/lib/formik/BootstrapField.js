import React from 'react'
import PropTypes from 'prop-types'
import { useField, ErrorMessage, useFormikContext } from 'formik'
import { Form } from 'react-bootstrap'

function BootstrapField ({
  label, description, grow, disabledWhileSubmit, autofocus, className,
  ...props
}) {

  const [field, meta] = useField(props)
  const { isSubmitting } = useFormikContext()

  return (
    <Form.Group className={className} style={ grow ? { flexGrow: 1 } : null } controlId={field.name}>
      { label && (
        <Form.Label>{ label }</Form.Label>
      ) }
      <Form.Control { ...field } { ...props } className={ meta.error ? 'is-invalid' : '' }
        style={ grow ? { flexGrow: 1 } : null }
        disabled={ disabledWhileSubmit && isSubmitting}
        autoFocus={ autofocus } />
      { description && (
        <small className="form-text text-muted">{ description }</small>
      ) }
      { meta.error && (
        <div className="invalid-feedback">
          <ErrorMessage name={field.name} />
        </div>
      ) }
    </Form.Group>
  )
}

BootstrapField.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  grow: PropTypes.bool,
  disabledWhileSubmit: PropTypes.bool,
  autofocus: PropTypes.bool,
  className: PropTypes.string
}

BootstrapField.defaultProps = {
  grow: false,
  disabledWhileSubmit: false,
  autofocus: false
}

export default BootstrapField

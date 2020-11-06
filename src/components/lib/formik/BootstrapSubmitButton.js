import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { Button } from 'react-bootstrap'

function BootstrapSubmitButton ({
  label, submittingLabel, caps, align, inline, style, className, ...props
}) {

  const { isSubmitting } = useFormikContext()
  const s = Object.assign({ fontVariant: caps ? 'small-caps' : 'none' }, style || {})

  function renderButton () {
    return (
      <Button variant={props.variant || 'primary'} type="submit"
        style={ s }
        disabled={isSubmitting} className={`btn-wide ml-2 ${className || ''}`} { ...props }>
        { isSubmitting ? submittingLabel : label }
      </Button>
    )
  }

  if (inline) {
    return renderButton()
  }

  return (
    <div align={ align }>
      { renderButton() }
    </div>
  )
}

BootstrapSubmitButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  submittingLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  caps: PropTypes.bool,
  align: PropTypes.string,
  inline: PropTypes.bool,
  style: PropTypes.any,
  className: PropTypes.string
}

BootstrapSubmitButton.defaultProps = {
  variant: 'primary',
  label: 'Submit',
  submittingLabel: 'Submitting...',
  caps: false,
  align: 'right',
  inline: false
}

export default BootstrapSubmitButton

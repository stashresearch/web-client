import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { formState } from '../../../config'

function ConnectFormikToRedux ({ state }) {

  const formik = useFormikContext()

  React.useEffect(() => {
    formik.setStatus(state)
    if (state.error) {
      // TODO parse
      if (typeof state.error === 'string') {
        formik.setStatus({ ...formik.status, errorMsg: state.error })
      } else if (Array.isArray(state.error)) {
        state.error.forEach() // TODO
      } else {
        if ('*' in state.error) {
          formik.setStatus({ ...formik.status, errorMsg: state.error['*'] })
        }
        formik.setErrors(state.error)
      }
      formik.setSubmitting(false)
    }
    formik.setSubmitting(state.submitting)
  }, [state])
  return (null)
}

ConnectFormikToRedux.propTypes = {
  state: PropTypes.shape(formState).isRequired
}

function connectFormikBag (state, bag) {
  bag.setStatus(state)
  if (state.error) {
    // TODO parse
    if (typeof state.error === 'string') {
      bag.setStatus({ ...state, errorMsg: state.error })
    } else if (Array.isArray(state.error)) {
      state.error.forEach() // TODO
    } else {
      if ('*' in state.error) {
        bag.setStatus({ ...state, errorMsg: state.error['*'] })
      }
      bag.setErrors(state.error)
    }
    bag.setSubmitting(false)
  }
  bag.setSubmitting(state.submitting)
}

export default React.memo(ConnectFormikToRedux)

export {
  connectFormikBag
}

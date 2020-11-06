import parseApiFormErrors from './parseApiFormErrors'

/**
 *
 * @param {any} state formState object
 *  formState = {
 *    submitCount: 0,
 *    submitting: false,
 *    success: false,
 *    error: null,
 *    payload: null
 *  }
 * @param {any} payload action payload
 */
function parseApiError (state, payload) {
  console.debug(payload)
  return {
    ...state,
    submitCount: state.submitCount + 1,
    submitting: false,
    success: false,
    error: parseApiFormErrors(payload),
    payload: null
  }
}

/**
 *
 * @param {any} state formState object
 *  formState = {
 *    submitCount: 0,
 *    submitting: false,
 *    success: false,
 *    error: null,
 *    payload: null
 *  }
 * @param {any} payload action payload
 */
function parsePendingState (state, payload) {
  return {
    ...state,
    submitting: true,
    success: false,
    error: null,
    payload: null
  }
}
/**
 *
 * @param {any} state formState object
 *  formState = {
 *    submitCount: 0,
 *    submitting: false,
 *    success: false,
 *    error: null,
 *    payload: null
 *  }
 * @param {any} payload action payload
 */
function parseApiSuccess (state, payload) {
  return {
    ...state,
    submitCount: state.submitCount + 1,
    submitting: false,
    success: true,
    error: null,
    payload
  }
}

export {
  parseApiError,
  parsePendingState,
  parseApiSuccess
}

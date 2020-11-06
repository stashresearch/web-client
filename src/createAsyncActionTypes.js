/**
 * Helper to create async action types,
 * according to redux-promise-middleware
 */
import { ActionType } from 'redux-promise-middleware'
const PENDING = `_${ActionType.Pending}`
const FULFILLED = `_${ActionType.Fulfilled}`
const REJECTED = `_${ActionType.Rejected}`

function createAsyncActionTypes (type) {
  return {
    type,
    PENDING: type + PENDING,
    FULFILLED: type + FULFILLED,
    REJECTED: type + REJECTED
  }
}

export default createAsyncActionTypes

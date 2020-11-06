import isPromise from 'is-promise'

export default function asyncMiddleware () {
  return (next) => {
    return (action) => {
      if (
        (action.payload && isPromise(action.payload)) ||
        (action.payload && action.payload.promise && isPromise(action.payload.promise))
      ) {
        return next(action).catch(() => null)
      }
      return next(action)
    }
  }
}

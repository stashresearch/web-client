
const RESET_CREATE_DATA_SOURCE = 'RESET_CREATE_DATA_SOURCE'

function resetCreateDataSource () {
  return {
    type: RESET_CREATE_DATA_SOURCE,
    payload: null
  }
}

export default resetCreateDataSource

export {
  RESET_CREATE_DATA_SOURCE
}

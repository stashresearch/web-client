
const ALT_FORMR_SOURCE_FORM = 'ALT_FORMR_SOURCE_FORM'

function alterFormrSourceForm ({ name, value }) {
  return {
    type: ALT_FORMR_SOURCE_FORM,
    payload: { name, value }
  }
}

export default alterFormrSourceForm

export {
  ALT_FORMR_SOURCE_FORM
}

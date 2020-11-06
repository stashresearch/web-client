
const ALT_FORMR_AUTH_FORM = 'ALT_FORMR_AUTH_FORM'

function alterFormrAuthForm ({ name, value }) {
  return {
    type: ALT_FORMR_AUTH_FORM,
    payload: { name, value }
  }
}

export default alterFormrAuthForm

export {
  ALT_FORMR_AUTH_FORM
}

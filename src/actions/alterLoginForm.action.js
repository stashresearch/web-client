
const ALT_LOGIN_FORM = 'ALT_LOGIN_FORM'

function alterLoginForm (field, value) {
  return {
    type: ALT_LOGIN_FORM,
    payload: {
      field, value
    }
  }
}

export default alterLoginForm

export {
  ALT_LOGIN_FORM
}

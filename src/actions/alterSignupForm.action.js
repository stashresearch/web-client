
const ALT_SIGNUP_FORM = 'ALT_SIGNUP_FORM'

function alterSignupForm (field, value) {
  return {
    type: ALT_SIGNUP_FORM,
    payload: {
      field, value
    }
  }
}

export default alterSignupForm

export {
  ALT_SIGNUP_FORM
}

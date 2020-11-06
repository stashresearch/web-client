
const ALT_PROJECT_NEW_FORM = 'ALT_PROJECT_NEW_FORM'

function alterProjectNewForm (field, value) {
  return {
    type: ALT_PROJECT_NEW_FORM,
    payload: {
      field, value
    }
  }
}

export default alterProjectNewForm

export {
  ALT_PROJECT_NEW_FORM
}

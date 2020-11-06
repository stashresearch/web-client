
const ERASE_DECRYPTED_PRIVATE_KEY = 'ERASE_DECRYPTED_PRIVATE_KEY'

function eraseDecryptedPrivateKey (projectId) {
  return {
    type: ERASE_DECRYPTED_PRIVATE_KEY,
    payload: { projectId }
  }
}

export default eraseDecryptedPrivateKey

export {
  ERASE_DECRYPTED_PRIVATE_KEY
}

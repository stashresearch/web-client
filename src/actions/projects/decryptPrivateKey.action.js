import createAsyncActionTypes from './../../createAsyncActionTypes'
import Crypto from '../../lib/Crypto'

const DECRYPT_PRIVATE_KEY = createAsyncActionTypes('DECRYPT_PRIVATE_KEY')

function decryptPrivateKey ({ projectId, encryptedPrivateKey, passphrase, password }) {
  return {
    type: DECRYPT_PRIVATE_KEY.type,
    payload: Crypto.decryptKey(encryptedPrivateKey, passphrase, password)
      .then((privateKey) => {
        // TODO setTimeout remove decrypted private key from store
        return {
          projectId,
          privateKey
        }
      })
  }
}

export default decryptPrivateKey

export {
  DECRYPT_PRIVATE_KEY
}
